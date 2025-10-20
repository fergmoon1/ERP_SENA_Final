import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Registrar detalles del error para diagnóstico
    // Nota: evita enviar datos sensibles en producción sin sanitizar
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary catch:', error, errorInfo);
    this.setState({ errorInfo });
    if (this.props.onError) {
      try {
        this.props.onError(error, errorInfo);
      } catch (_) {
        // ignora errores del callback
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-message" style={{ padding: 24 }}>
          <i className="fas fa-bug" />
          <div style={{ fontWeight: 700 }}>Se produjo un error en la interfaz.</div>
          <pre style={{ textAlign: 'left', whiteSpace: 'pre-wrap', overflowX: 'auto', maxWidth: '100%' }}>
            {String(this.state.error)}
          </pre>
          <button onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}>
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;


