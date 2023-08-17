import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./globals.css";
import "../node_modules/video-react/dist/video-react.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);