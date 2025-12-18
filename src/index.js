import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import { App } from './App';
import './assets/styles/bootstrap.min.css';
import './assets/styles/bootstrap.min.js';
import './assets/styles/main.css';
import './assets/styles/font.css';

// setup fake backend
import { configureFakeBackend } from './utils';
configureFakeBackend();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
