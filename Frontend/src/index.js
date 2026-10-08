
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Starfield from './components/starfield/Starfield';

// Global styles
import './styles/variables.css';
import './styles/global.css';
import './styles/responsive.css';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Starfield />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);