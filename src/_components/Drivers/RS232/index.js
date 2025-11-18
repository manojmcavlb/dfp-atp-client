import { useEffect, useState } from 'react';
import { useSerial } from '../../../_services/useSerial';

export default function Serial() {
  const { lines, listPorts, open, send, close } = useSerial();
  const [ports, setPorts] = useState([]);
  const [selected, setSelected] = useState('');
  const [baudRate, setBaudRate] = useState(9600);
  const [text, setText] = useState('Hello RS232!');

  useEffect(() => {
    (async () => {
      const p = await listPorts();
      setPorts(p);
      if (p[0]?.path) setSelected(p[0].path);
    })();
  }, []); //listPorts

  return (
    <div style={{ fontFamily: 'system-ui', padding: 16 }}>
      <h2>RS232 Demo</h2>

      {/* RS232 UI */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div>
          <label>Port: </label>
          <select value={selected} onChange={e => setSelected(e.target.value)}>
            {ports.map(p => (
              <option key={p.path} value={p.path}>
                {p.path} ({p.manufacturer ?? 'unknown'})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Baud: </label>
          <input type="number" value={baudRate} onChange={e => setBaudRate(Number(e.target.value))} />
        </div>
        <button onClick={() => open(selected, { baudRate, delimiter: '\r\n' })}>Open</button>
        <button onClick={() => close()}>Close</button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input style={{ width: 300 }} value={text} onChange={e => setText(e.target.value)} />
        <button onClick={() => send(text, { appendDelimiter: true, delimiter: '\r\n' })}>Send</button>
      </div>

      <pre style={{ background: '#111', color: '#0f0', padding: 12, height: 200, overflow: 'auto' }}>
        {lines.join('\n')}
      </pre>
    </div>
  );
}
