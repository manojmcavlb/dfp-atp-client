// useEthernet.js
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../utils/constants';

/**
 * useEthernet - tailored to new backend endpoints for BK9801
 * Exposes:
 *  - tcpConnect(host, port)
 *  - tcpSend(data, appendNewline = true, opts = { expectResponse, perCmdTimeoutMs })
 *  - tcpClose()
 *  - measureVolt()
 *  - measureCurr()
 *  - tcpSpeedTest(params)
 *
 * Listens to socket.io events: tcp_open, tcp_rx, tcp_tx, tcp_err, tcp_close, tcp_speed, tcp_speed_err
 */
export function useEthernet() {
  const [log, setLog] = useState([]);
  const socketRef = useRef(null);

  // maintain a stable socket.io connection across renders
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(API_BASE_URL, { autoConnect: true });
    }
    const socket = socketRef.current;

    const push = (line) => {
      setLog((prev) => {
        const ts = new Date().toLocaleTimeString();
        const next = [...prev, `[${ts}] ${line}`];
        if (next.length > 2000) next.shift();
        return next;
      });
    };

    socket.on('connect', () => push('socket.io connected'));
    socket.on('disconnect', (reason) => push(`socket.io disconnected (${reason})`));
    socket.on('tcp_open', (info) => push(`TCP OPEN ${info.host}:${info.port}`));
    socket.on('tcp_rx', (data) => push(`TCP RX: ${data}`));
    socket.on('tcp_tx', (data) => push(`TCP TX: ${data}`));
    socket.on('tcp_err', (msg) => push(`TCP ERR: ${msg}`));
    socket.on('tcp_close', () => push('TCP CLOSE'));

    // optional speed events (backend may emit these)
    socket.on('tcp_speed', (r) => {
      // try to print sensible fields
      if (r && r.megabytes !== undefined && r.seconds !== undefined) {
        push(`TCP SPEED EVENT: ${r.megabytes} MB in ${r.seconds}s = ${(r.mb_per_s ?? r.mbps ?? 0).toFixed ? (r.mb_per_s ?? r.mbps).toFixed(3) : (r.mb_per_s ?? r.mbps)} MB/s`);
      } else {
        push(`TCP SPEED EVENT: ${JSON.stringify(r)}`);
      }
    });
    socket.on('tcp_speed_err', (e) => push(`TCP SPEED ERR: ${e}`));

    return () => {
      if (socket) {
        socket.removeAllListeners();
        socket.close();
        socketRef.current = null;
      }
    };
    // react-hooks/exhaustive-deps
  }, []);

  const pushLog = (line) => {
    setLog((prev) => {
      const ts = new Date().toLocaleTimeString();
      const next = [...prev, `[${ts}] ${line}`];
      if (next.length > 2000) next.shift();
      return next;
    });
  };

  // Helper for REST calls that returns json and logs non-OK responses
  async function callApi(path, opts = {}) {
    try {
      const res = await fetch(API_BASE_URL + path, opts);
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        pushLog(`API ${path} FAILED: ${JSON.stringify(json)}`);
        return { ok: false, status: res.status, body: json };
      }
      return { ok: true, status: res.status, body: json };
    } catch (err) {
      pushLog(`API ${path} ERROR: ${err.message}`);
      return { ok: false, error: err.message };
    }
  }

  /* ---------------------- API wrappers ---------------------- */

  const tcpConnect = async (host, port) => {
    pushLog(`Request connect ${host}:${port}`);
    const r = await callApi('/tcp/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ host, port })
    });
    if (r.ok) pushLog(`Connect OK: ${JSON.stringify(r.body)}`);
    return r;
  };

  /**
   * tcpSend(data, appendNewline = true, opts = { expectResponse: true, perCmdTimeoutMs: 3000 })
   */
  const tcpSend = async (data, appendNewline = true, opts = {}) => {
    try {
      const body = { data, appendNewline, expectResponse: opts.expectResponse ?? true };
      if (opts.perCmdTimeoutMs) body.perCmdTimeoutMs = opts.perCmdTimeoutMs;

      pushLog(`SEND -> ${data} (expectResponse=${body.expectResponse})`);
      const r = await callApi('/tcp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (r.ok) {
        // backend returns reply if expectResponse true
        if (r.body && (r.body.reply !== undefined || r.body.timeout !== undefined)) {
          if (r.body.timeout) pushLog(`SEND reply TIMEOUT (no instrument reply)`);
          else pushLog(`SEND reply: ${r.body.reply}  (rtt=${r.body.rtt_ms ?? 'n/a'} ms)`);
        } else {
          pushLog(`SEND ok (no reply expected).`);
        }
      }
      return r;
    } catch (err) {
      pushLog(`tcpSend error: ${err.message}`);
      throw err;
    }
  };

  const tcpClose = async () => {
    pushLog('Request close');
    const r = await callApi('/tcp/close', { method: 'POST' });
    if (r.ok) pushLog('Closed');
    return r;
  };

  const measureVolt = async () => {
    pushLog('Measure: voltage ...');
    const r = await callApi('/tcp/measure/volt', { method: 'GET' });
    if (r.ok) {
      const b = r.body;
      pushLog(`VOLT: raw=${b.raw} value=${b.value} V (rtt=${b.rtt_ms} ms)`);
    }
    return r;
  };

  const measureCurr = async () => {
    pushLog('Measure: current ...');
    const r = await callApi('/tcp/measure/curr', { method: 'GET' });
    if (r.ok) {
      const b = r.body;
      pushLog(`CURR: raw=${b.raw} value=${b.value} A (rtt=${b.rtt_ms} ms)`);
    }
    return r;
  };

  /**
   * tcpSpeedTest(params)
   * params: { mode, command, count, duration, minDelayMs, perCmdTimeoutMs, maxConsecutiveTimeouts }
   */
  const tcpSpeedTest = async (params = {}) => {
    pushLog(`Start speed test: ${JSON.stringify(params)}`);
    const r = await callApi('/tcp/speedtest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    if (!r.ok) return r;

    const b = r.body;
    // rtt mode returns results array and stats; throughput returns summary
    if (b.mode === 'rtt' && Array.isArray(b.results)) {
      pushLog(`Speed RTT done: avg_ms=${b.stats?.avg_ms} min=${b.stats?.min_ms} max=${b.stats?.max_ms} ops/s=${b.stats?.ops_per_sec}`);
      pushLog(`Results samples: ${b.results.slice(0, 5).map(x => `#${x.i}:${x.raw}/${x.rtt_ms}ms`).join(' | ')}`);
    } else if (b.mode === 'throughput') {
      pushLog(`Throughput done: ${Number(b.megabytes).toFixed(6)} MB in ${Number(b.durationMeasuredSec).toFixed(3)}s => ${Number(b.mb_per_s).toFixed(6)} MB/s, ops/s=${Number(b.ops_per_sec).toFixed(2)}`);
    } else {
      pushLog(`Speed test result: ${JSON.stringify(b)}`);
    }

    return r;
  };

  return {
    log,
    tcpConnect,
    tcpSend,
    tcpClose,
    measureVolt,
    measureCurr,
    tcpSpeedTest
  };
}