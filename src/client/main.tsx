import React from 'react';
import ReactDOM from 'react-dom/client';
import { TEST_CONSTANT } from '../common/constants';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <h1>{TEST_CONSTANT}</h1>
  </React.StrictMode>
);
