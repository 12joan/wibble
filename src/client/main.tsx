import React from 'react';
import ReactDOM from 'react-dom/client';
import cssHasPseudo from 'css-has-pseudo/browser';
import { App } from './App';

import './index.css';

cssHasPseudo(document);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
