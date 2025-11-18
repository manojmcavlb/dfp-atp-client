import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../_helpers/constants';

export function useEthernet() {
  const [log, setLog] = useState([]);
  const socket = useMemo(() => io(API_BASE_URL, { autoConnect: true }), [API_BASE_URL]);

  const push = (line) => setLog((prev) => [...prev, line]);

  useEffect(() => {
    socket.on('tcp_open', (info) => push(`TCP OPEN ${info.host}:${info.port}`));
    socket.on('tcp_rx', (data) => push(`TCP RX: ${data}`));
    socket.on('tcp_tx', (data) => push(`TCP TX: ${data}`));
    socket.on('tcp_err', (msg) => push(`TCP ERR: ${msg}`));
    socket.on('tcp_close', () => push('TCP CLOSE'));

    socket.on('udp_bind', (info) => push(`UDP BIND local :${info.localPort}`));
    socket.on('udp_rx', (m) => push(`UDP RX from ${m.from}: ${m.data}`));
    socket.on('udp_tx', (m) => push(`UDP TX to ${m.to}: ${m.data}`));
    socket.on('udp_err', (msg) => push(`UDP ERR: ${msg}`));
    socket.on('udp_close', () => push('UDP CLOSE'));

    socket.on('tcp_echo_listening', (i) => push(`TCP ECHO listening :${i.port}`));
    socket.on('udp_echo_listening', (i) => push(`UDP ECHO listening :${i.port}`));
    socket.on('tcp_echo_err', (e) => push(`TCP ECHO ERR: ${e}`));
    socket.on('udp_echo_err', (e) => push(`UDP ECHO ERR: ${e}`));
    
    // ⭐ NEW: SPEED TEST SOCKET EVENTS
    socket.on('tcp_speed', (r) =>
      push(`TCP SPEED: ${r.megabytes}MB in ${r.seconds}s = ${r.mbps} MB/s`)
    );

    socket.on('tcp_speed_err', (msg) =>
      push(`TCP SPEED ERR: ${msg}`)
    );

    return () => socket.close();
  }, [socket]);

  // REST helpers (CRA proxy forwards to http://localhost:3001)
  const tcpConnect = async (host, port) =>
    (await fetch(API_BASE_URL + '/tcp/connect', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ host, port }) })).json();

  const tcpSend = async (data, appendNewline = true) =>
    (await fetch(API_BASE_URL + '/tcp/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data, appendNewline }) })).json();

  const tcpClose = async () => (await fetch(API_BASE_URL + '/tcp/close', { method: 'POST' })).json();

  const udpBind = async (localPort, remoteHost, remotePort) =>
    (await fetch(API_BASE_URL + '/udp/bind', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ localPort, remoteHost, remotePort }) })).json();

  const udpSend = async (data, host, port) =>
    (await fetch(API_BASE_URL + '/udp/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data, host, port }) })).json();

  const udpClose = async () => (await fetch(API_BASE_URL + '/udp/close', { method: 'POST' })).json();

  const startTcpEcho = async (port) =>
    (await fetch(API_BASE_URL + '/tcp-echo/start', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ port }) })).json();
  const stopTcpEcho = async () => (await fetch(API_BASE_URL + '/tcp-echo/stop', { method: 'POST' })).json();

  const startUdpEcho = async (port) =>
    (await fetch(API_BASE_URL + '/udp-echo/start', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ port }) })).json();
  const stopUdpEcho = async () => (await fetch(API_BASE_URL + '/udp-echo/stop', { method: 'POST' })).json();

    // ⭐ NEW: SPEED TEST API
  const tcpSpeedTest = async (megabytes = 5) =>
    (await fetch(API_BASE_URL + '/tcp/speedtest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ megabytes })
    })).json();

  return {
    log, tcpConnect, tcpSend, tcpClose, tcpSpeedTest, udpBind, udpSend, udpClose,
    startTcpEcho, stopTcpEcho, startUdpEcho, stopUdpEcho
  };
}