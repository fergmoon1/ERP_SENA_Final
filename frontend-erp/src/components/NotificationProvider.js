import React, { createContext, useContext, useState, useEffect } from 'react';
import '../styles/NotificationProvider.css';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [stockAlerts, setStockAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para obtener notificaciones del backend
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) return;

      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) return;

      setLoading(true);
      const response = await fetch(`http://localhost:8081/api/notificaciones/usuario/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Notificaciones recibidas del backend:', data);
        setNotifications(data);
      } else {
        console.error('Error fetching notifications:', response.status);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para marcar notificación como leída en el backend
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) return;

      const response = await fetch(`http://localhost:8081/api/notificaciones/${id}/marcar-leida`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Actualizar estado local
        setNotifications(prev => 
          prev.map(n => n.id === id ? { ...n, leida: true } : n)
        );
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Función para marcar todas como leídas en el backend
  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) return;

      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) return;

      const response = await fetch(`http://localhost:8081/api/notificaciones/usuario/${user.id}/marcar-todas-leidas`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Actualizar estado local
        setNotifications(prev => prev.map(n => ({ ...n, leida: true })));
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Función para agregar notificación local (para feedback inmediato)
  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now() + Math.random(),
      timestamp: new Date(),
      leida: false
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Mantener solo las últimas 10
    
    // Auto-remove success notifications after 5 seconds
    if (notification.type === 'success') {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, 5000);
    }
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addStockAlert = (product) => {
    const existingAlert = stockAlerts.find(alert => alert.productId === product.id);
    if (!existingAlert) {
      setStockAlerts(prev => [...prev, {
        id: Date.now(),
        productId: product.id,
        product: product,
        timestamp: new Date(),
        read: false
      }]);
      
      // Add notification
      addNotification({
        type: 'warning',
        title: 'Stock Bajo',
        message: `${product.nombre} tiene stock bajo (${product.stockActual} unidades)`,
        product: product
      });
    }
  };

  const removeStockAlert = (productId) => {
    setStockAlerts(prev => prev.filter(alert => alert.productId !== productId));
  };

  const clearStockAlerts = () => {
    setStockAlerts([]);
  };

  // Cargar notificaciones al montar el componente
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Check for stock alerts periodically
  useEffect(() => {
    const checkStockAlerts = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) return;

        const response = await fetch('http://localhost:8081/api/reportes/stock-bajo', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const criticalStock = await response.json();
          criticalStock.forEach(product => {
            if (product.stockActual <= 5) {
              addStockAlert(product);
            }
          });
        }
      } catch (error) {
        console.error('Error checking stock alerts:', error);
      }
    };

    // Check immediately
    checkStockAlerts();

    // Check every 5 minutes
    const interval = setInterval(checkStockAlerts, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const value = {
    notifications,
    stockAlerts,
    loading,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    addStockAlert,
    removeStockAlert,
    clearStockAlerts,
    fetchNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

const NotificationContainer = () => {
  const { notifications, stockAlerts, loading, removeNotification, markAsRead, markAllAsRead, clearStockAlerts } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showStockAlerts, setShowStockAlerts] = useState(false);

  const unreadCount = notifications.filter(n => !n.leida).length;
  const stockAlertCount = stockAlerts.filter(a => !a.read).length;

  return (
    <>
      {/* Notification Bell */}
      <div className="notification-bell">
        <button 
          className="notification-trigger"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <i className="fas fa-bell"></i>
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </button>

        {/* Stock Alert Button */}
        {stockAlertCount > 0 && (
          <button 
            className="stock-alert-trigger"
            onClick={() => setShowStockAlerts(!showStockAlerts)}
          >
            <i className="fas fa-exclamation-triangle"></i>
            <span className="stock-alert-badge">{stockAlertCount}</span>
          </button>
        )}
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notificaciones</h3>
            <div className="notification-actions">
              <button onClick={markAllAsRead} className="btn-mark-all">
                Marcar como leídas
              </button>
              <button onClick={() => setShowNotifications(false)} className="btn-close">
                ×
              </button>
            </div>
          </div>
          
          <div className="notification-list">
            {loading ? (
              <div className="loading-notifications">
                <i className="fas fa-spinner fa-spin"></i>
                <p>Cargando notificaciones...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="no-notifications">
                <i className="fas fa-bell-slash"></i>
                <p>No hay notificaciones</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.tipo || notification.type} ${!notification.leida ? 'unread' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    {(notification.tipo === 'success' || notification.type === 'success') && <i className="fas fa-check-circle"></i>}
                    {(notification.tipo === 'error' || notification.type === 'error') && <i className="fas fa-exclamation-circle"></i>}
                    {(notification.tipo === 'warning' || notification.type === 'warning') && <i className="fas fa-exclamation-triangle"></i>}
                    {(notification.tipo === 'info' || notification.type === 'info') && <i className="fas fa-info-circle"></i>}
                  </div>
                  <div className="notification-content">
                    <h4>{notification.titulo || notification.title}</h4>
                    <p>{notification.mensaje || notification.message}</p>
                    <small>{new Date(notification.timestamp || notification.createdAt).toLocaleString()}</small>
                  </div>
                  <button 
                    className="notification-close"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(notification.id);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Stock Alerts Dropdown */}
      {showStockAlerts && (
        <div className="stock-alert-dropdown">
          <div className="notification-header">
            <h3>Alertas de Stock</h3>
            <div className="notification-actions">
              <button onClick={clearStockAlerts} className="btn-mark-all">
                Limpiar alertas
              </button>
              <button onClick={() => setShowStockAlerts(false)} className="btn-close">
                ×
              </button>
            </div>
          </div>
          
          <div className="notification-list">
            {stockAlerts.length === 0 ? (
              <div className="no-notifications">
                <i className="fas fa-check-circle"></i>
                <p>No hay alertas de stock</p>
              </div>
            ) : (
              stockAlerts.map(alert => (
                <div 
                  key={alert.id} 
                  className={`notification-item warning ${!alert.read ? 'unread' : ''}`}
                >
                  <div className="notification-icon">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <div className="notification-content">
                    <h4>Stock Bajo</h4>
                    <p>{alert.product.nombre} tiene stock bajo ({alert.product.stockActual} unidades)</p>
                    <small>{new Date(alert.timestamp).toLocaleString()}</small>
                  </div>
                  <button 
                    className="notification-close"
                    onClick={() => removeStockAlert(alert.productId)}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}; 