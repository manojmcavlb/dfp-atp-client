// ethernet/index.js
import { useState } from 'react';
import { useEthernet } from '../../../../services/useEthernet';

export default function Ethernet() {
  const {
    log,
    tcpConnect,
    tcpSend,
    tcpClose,
    measureVolt,
    measureCurr,
    tcpSpeedTest
  } = useEthernet();

  // TCP state
  const [tcpHost, setTcpHost] = useState('192.168.0.1');
  const [tcpPort, setTcpPort] = useState(30000); // SCPI default
  const [tcpMsg, setTcpMsg] = useState('MEAS:VOLT?');

  // Speed test UI state
  const [speedMode, setSpeedMode] = useState('rtt'); // 'rtt' | 'throughput'
  const [speedCount, setSpeedCount] = useState(10); // for rtt
  const [speedDuration, setSpeedDuration] = useState(5); // for throughput (seconds)
  const [minDelayMs, setMinDelayMs] = useState(10);
  const [perCmdTimeoutMs, setPerCmdTimeoutMs] = useState(3000);
  const [maxConsecutiveTimeouts, setMaxConsecutiveTimeouts] = useState(5);

  // Fire-and-forget toggle for send
  const [expectResponse, setExpectResponse] = useState(true);

  return (
    <div style={{ marginTop: 24, padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
      <h3>Ethernet Test — BK9801 (TCP)</h3>

      <section style={{ marginBottom: 16 }}>
        <h4>TCP Connection</h4>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <label>Host:</label>
          <input value={tcpHost} onChange={e => setTcpHost(e.target.value)} style={{ width: 160 }} />
          <label>Port:</label>
          <input type="number" value={tcpPort} onChange={e => setTcpPort(Number(e.target.value))} style={{ width: 100 }} />
          <button onClick={() => tcpConnect(tcpHost, tcpPort)}>Connect</button>
          <button onClick={() => tcpClose()}>Close</button>
        </div>

        <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <input value={tcpMsg} onChange={e => setTcpMsg(e.target.value)} style={{ width: 360 }} />
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" checked={expectResponse} onChange={e => setExpectResponse(e.target.checked)} />
            Expect Response
          </label>
          <button onClick={() => tcpSend(tcpMsg, /*appendNewline:*/ true, { expectResponse, perCmdTimeoutMs })}>
            Send
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <button onClick={() => measureVolt()}>Measure Voltage</button>
          <button onClick={() => measureCurr()} style={{ marginLeft: 8 }}>Measure Current</button>
        </div>
      </section>

      <section style={{ marginBottom: 16 }}>
        <h4>Speed Test</h4>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <label>Mode:</label>
          <select value={speedMode} onChange={e => setSpeedMode(e.target.value)}>
            <option value="rtt">RTT (count)</option>
            <option value="throughput">Throughput (duration)</option>
          </select>

          {speedMode === 'rtt' ? (
            <>
              <label>Count:</label>
              <input type="number" value={speedCount} onChange={e => setSpeedCount(Number(e.target.value))} style={{ width: 80 }} />
            </>
          ) : (
            <>
              <label>Duration (s):</label>
              <input type="number" value={speedDuration} onChange={e => setSpeedDuration(Number(e.target.value))} style={{ width: 80 }} />
            </>
          )}

          <label>minDelayMs:</label>
          <input type="number" value={minDelayMs} onChange={e => setMinDelayMs(Number(e.target.value))} style={{ width: 80 }} />

          <label>perCmdTimeoutMs:</label>
          <input type="number" value={perCmdTimeoutMs} onChange={e => setPerCmdTimeoutMs(Number(e.target.value))} style={{ width: 100 }} />

          <label>maxTimeouts:</label>
          <input type="number" value={maxConsecutiveTimeouts} onChange={e => setMaxConsecutiveTimeouts(Number(e.target.value))} style={{ width: 80 }} />

          <button
            onClick={() => tcpSpeedTest({
              mode: speedMode,
              command: tcpMsg || 'MEAS:VOLT?',
              count: speedCount,
              duration: speedDuration,
              minDelayMs,
              perCmdTimeoutMs,
              maxConsecutiveTimeouts
            })}
          >
            Run Speed Test
          </button>
        </div>
        <p style={{ fontSize: 12, color: '#555', marginTop: 8 }}>
          Speed test uses safe send→await-reply loops (suitable for SCPI instruments like BK9801).
        </p>
      </section>

      <pre style={{ background: '#111', color: '#0f0', padding: 12, height: 320, overflow: 'auto' }}>
        {log.join('\n')}
      </pre>
    </div>
  );
}