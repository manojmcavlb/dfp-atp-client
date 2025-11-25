import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/main.css';
import './assets/styles/font.css';

// setup fake backend
import { configureFakeBackend } from './utils';
configureFakeBackend();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <App />
  </React.StrictMode>
);
