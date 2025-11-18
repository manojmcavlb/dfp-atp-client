import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../_helpers/constants';

export function useSerial(socketUrl = API_BASE_URL) {
  const [lines, setLines] = useState([]);

  // memoize socket connection
  const socket = useMemo(() => io(socketUrl, { autoConnect: true }), [socketUrl]);

  useEffect(() => {
    socket.on('serial_rx', (line) => setLines(prev => [...prev, `RX: ${line}`]));
    socket.on('serial_rx_raw', (arr) => setLines(prev => [...prev, `RX(raw): [${arr.join(', ')}]`]));
    socket.on('serial_tx', (line) => setLines(prev => [...prev, `TX: ${line}`]));
    socket.on('serial_err', (msg) => setLines(prev => [...prev, `ERR: ${msg}`]));
    socket.on('serial_open', (info) => setLines(prev => [...prev, `OPEN: ${JSON.stringify(info)}`]));
    socket.on('serial_close', () => setLines(prev => [...prev, 'CLOSE']));
    return () => socket.close();
  }, [socket]);

  // -------------------------------
  // 🔥 Helper to fetch + handle error
  // -------------------------------
  const safeFetch = async (path, options = {}) => {
    try {
      const res = await fetch(API_BASE_URL + path, options);

      if (!res.ok) {
        const errMsg = `HTTP ${res.status}: ${res.statusText}`;
        setLines(prev => [...prev, `ERR(fetch): ${errMsg}`]);
        throw new Error(errMsg);
      }

      return await res.json();
    } catch (err) {
      setLines(prev => [...prev, `ERR(fetch): ${err.message || err}`]);
      return { error: true, message: err.message }; 
    }
  };

  // REST helpers
  const listPorts = () =>
    safeFetch('/ports');

  const open = (path, options = {}) =>
    safeFetch('/open', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, ...options })
    });

  const send = (data, options = {}) =>
    safeFetch('/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, ...options })
    });

  const close = () =>
    safeFetch('/close', { method: 'POST' });

  return { lines, listPorts, open, send, close };
}
