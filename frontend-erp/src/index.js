import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// Diagnóstico: capturar errores y rechazos no controlados
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    // eslint-disable-next-line no-console
    console.error('Global window.error:', event.error || event.message, event.filename, event.lineno, event.colno);
  });

  window.addEventListener('unhandledrejection', (event) => {
    // Algunas librerías envían errores ofuscados como "Timeout (u)"
    // eslint-disable-next-line no-console
    console.error('Global unhandledrejection:', event.reason);
  });
}
