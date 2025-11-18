import { useState } from 'react';
import { useEthernet } from '../../../_services/useEthernet';

export default function Ethernet() {
  const {
    log, tcpConnect, tcpSend, tcpClose, tcpSpeedTest,
    udpBind, udpSend, udpClose,
    startTcpEcho, stopTcpEcho, startUdpEcho, stopUdpEcho
  } = useEthernet();

  // TCP state
  const [tcpHost, setTcpHost] = useState('127.0.0.1');
  const [tcpPort, setTcpPort] = useState(9100);
  const [tcpMsg, setTcpMsg] = useState('Hello TCP!');

  // UDP state
  const [udpLocalPort, setUdpLocalPort] = useState(0);
  const [udpRemoteHost, setUdpRemoteHost] = useState('127.0.0.1');
  const [udpRemotePort, setUdpRemotePort] = useState(9200);
  const [udpMsg, setUdpMsg] = useState('Hello UDP!');

  // Echo ports
  const [tcpEchoPort, setTcpEchoPort] = useState(9100);
  const [udpEchoPort, setUdpEchoPort] = useState(9200);

  return (
    <div style={{ marginTop: 24, padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
      <h3>Ethernet Test (TCP & UDP)</h3>

      {/* TCP */}
      <section style={{ marginBottom: 16 }}>
        <h4>TCP Client</h4>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <label>Host:</label>
          <input value={tcpHost} onChange={e => setTcpHost(e.target.value)} style={{ width: 140 }} />
          <label>Port:</label>
          <input type="number" value={tcpPort} onChange={e => setTcpPort(Number(e.target.value))} style={{ width: 100 }} />
          <button onClick={() => tcpConnect(tcpHost, tcpPort)}>Connect</button>
          <button onClick={() => tcpClose()}>Close</button>
        </div>
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <input value={tcpMsg} onChange={e => setTcpMsg(e.target.value)} style={{ width: 320 }} />
          <button onClick={() => tcpSend(tcpMsg, true)}>Send</button>
        </div>
        <div style={{ marginTop: 12 }}>
          <button onClick={() => tcpSpeedTest(5)}>Run 5MB Speed Test</button>
        </div>
      </section>

      {/* UDP */}
      {/* <section style={{ marginBottom: 16 }}>
        <h4>UDP Client</h4>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <label>Local Port:</label>
          <input type="number" value={udpLocalPort} onChange={e => setUdpLocalPort(Number(e.target.value))} style={{ width: 100 }} />
          <label>Remote Host:</label>
          <input value={udpRemoteHost} onChange={e => setUdpRemoteHost(e.target.value)} style={{ width: 140 }} />
          <label>Remote Port:</label>
          <input type="number" value={udpRemotePort} onChange={e => setUdpRemotePort(Number(e.target.value))} style={{ width: 100 }} />
          <button onClick={() => udpBind(udpLocalPort, udpRemoteHost, udpRemotePort)}>Bind</button>
          <button onClick={() => udpClose()}>Close</button>
        </div>
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <input value={udpMsg} onChange={e => setUdpMsg(e.target.value)} style={{ width: 320 }} />
          <button onClick={() => udpSend(udpMsg, udpRemoteHost, udpRemotePort)}>Send</button>
        </div>
      </section> */}

      {/* Local Echo Servers (for demo without external device) */}
      {/* <section style={{ marginBottom: 16 }}>
        <h4>Local Echo (for quick demo)</h4>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <span>TCP Echo Port:</span>
          <input type="number" value={tcpEchoPort} onChange={e => setTcpEchoPort(Number(e.target.value))} style={{ width: 100 }} />
          <button onClick={() => startTcpEcho(tcpEchoPort)}>Start TCP Echo</button>
          <button onClick={() => stopTcpEcho()}>Stop TCP Echo</button>

          <span style={{ marginLeft: 24 }}>UDP Echo Port:</span>
          <input type="number" value={udpEchoPort} onChange={e => setUdpEchoPort(Number(e.target.value))} style={{ width: 100 }} />
          <button onClick={() => startUdpEcho(udpEchoPort)}>Start UDP Echo</button>
          <button onClick={() => stopUdpEcho()}>Stop UDP Echo</button>
        </div>
        <p style={{ fontSize: 12, color: '#555', marginTop: 4 }}>
          Tip: Start local echo, then connect TCP to 127.0.0.1:{tcpEchoPort}, or bind UDP and send to 127.0.0.1:{udpEchoPort}.
          Windows Firewall may prompt—click “Allow”.
        </p>
      </section> */}

      <pre style={{ background: '#111', color: '#0f0', padding: 12, height: 260, overflow: 'auto' }}>
        {log.join('\n')}
      </pre>
    </div>
  );
}