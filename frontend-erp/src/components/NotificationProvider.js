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

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now() + Math.random(),
      timestamp: new Date(),
      read: false
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

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
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
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    addStockAlert,
    removeStockAlert,
    clearStockAlerts
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

const NotificationContainer = () => {
  const { notifications, stockAlerts, removeNotification, markAsRead, markAllAsRead, clearStockAlerts } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showStockAlerts, setShowStockAlerts] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
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
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <i className="fas fa-bell-slash"></i>
                <p>No hay notificaciones</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.type} ${!notification.read ? 'unread' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    {notification.type === 'success' && <i className="fas fa-check-circle"></i>}
                    {notification.type === 'error' && <i className="fas fa-exclamation-circle"></i>}
                    {notification.type === 'warning' && <i className="fas fa-exclamation-triangle"></i>}
                    {notification.type === 'info' && <i className="fas fa-info-circle"></i>}
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <button 
                    className="notification-remove"
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
          <div className="stock-alert-header">
            <h3>Alertas de Stock</h3>
            <div className="stock-alert-actions">
              <button onClick={clearStockAlerts} className="btn-clear-all">
                Limpiar todas
              </button>
              <button onClick={() => setShowStockAlerts(false)} className="btn-close">
                ×
              </button>
            </div>
          </div>
          
          <div className="stock-alert-list">
            {stockAlerts.length === 0 ? (
              <div className="no-alerts">
                <i className="fas fa-check-circle"></i>
                <p>No hay alertas de stock</p>
              </div>
            ) : (
              stockAlerts.map(alert => (
                <div key={alert.id} className="stock-alert-item">
                  <div className="stock-alert-icon">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <div className="stock-alert-content">
                    <div className="stock-alert-title">{alert.product.nombre}</div>
                    <div className="stock-alert-message">
                      Stock crítico: {alert.product.stockActual} unidades
                    </div>
                    <div className="stock-alert-time">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {(showNotifications || showStockAlerts) && (
        <div 
          className="notification-overlay"
          onClick={() => {
            setShowNotifications(false);
            setShowStockAlerts(false);
          }}
        />
      )}
    </>
  );
}; 