# 📊 Guía para Mostrar los Gráficos del Dashboard

## 🎯 Objetivo
Mostrar cómo visualizar correctamente los gráficos y la información de pedidos por estado en el dashboard del ERP SENA.

## 📋 Pasos para Mostrar los Gráficos

### 1. **Preparar la Base de Datos**
```bash
# Ejecutar el script de datos de ejemplo
ejecutar_datos_ejemplo.bat
```

### 2. **Verificar que el Backend esté Funcionando**
```bash
# Asegúrate de que el backend esté corriendo en el puerto 8081
# El servidor debe estar ejecutándose en: http://localhost:8081
```

### 3. **Verificar que el Frontend esté Funcionando**
```bash
# El frontend debe estar corriendo en el puerto 3001
# Accede a: http://localhost:3001
```

### 4. **Acceder al Dashboard**
1. Inicia sesión con cualquier usuario (admin, supervisor, user)
2. Navega al dashboard: `http://localhost:3001/dashboard`
3. Los gráficos deberían cargar automáticamente

## 📊 Gráficos Disponibles

### 1. **Gráfico de Pedidos por Estado** 🥧
- **Tipo**: Gráfico de pastel (PieChart)
- **Datos**: Cantidad de pedidos por cada estado
- **Estados**: Pendiente, Enviado, Entregado, Cancelado
- **Colores**: 
  - Pendiente: Amarillo
  - Enviado: Azul
  - Entregado: Verde
  - Cancelado: Rojo

### 2. **Gráfico de Ingresos por Mes** 📈
- **Tipo**: Gráfico de líneas (LineChart)
- **Datos**: Ingresos totales por mes
- **Formato**: Valores monetarios con formato $XXX.XX
- **Período**: Últimos 6 meses

### 3. **Gráfico de Productos Más Vendidos** 📊
- **Tipo**: Gráfico de barras (BarChart)
- **Datos**: Cantidad vendida por producto
- **Características**: Etiquetas rotadas para mejor legibilidad
- **Límite**: Top 10 productos

### 4. **Gráfico de Clientes Nuevos por Mes** 📈
- **Tipo**: Gráfico de líneas (LineChart)
- **Datos**: Cantidad de clientes nuevos por mes
- **Color**: Verde distintivo
- **Período**: Últimos 12 meses

## 🔧 Solución de Problemas

### Si los gráficos no aparecen:

1. **Verificar la Consola del Navegador** (F12)
   - Busca errores en la pestaña "Console"
   - Los logs de debugging mostrarán qué datos se están recibiendo

2. **Verificar los Endpoints**:
   ```bash
   # Probar los endpoints manualmente
   curl -H "Authorization: Bearer TU_TOKEN" http://localhost:8081/api/reportes/pedidos-por-estado
   curl -H "Authorization: Bearer TU_TOKEN" http://localhost:8081/api/reportes/ingresos-por-mes
   curl -H "Authorization: Bearer TU_TOKEN" http://localhost:8081/api/reportes/ventas/productos-mas-vendidos
   curl -H "Authorization: Bearer TU_TOKEN" http://localhost:8081/api/reportes/clientes-nuevos-por-mes
   ```

3. **Verificar la Base de Datos**:
   ```sql
   -- Verificar pedidos con estados
   SELECT estado, COUNT(*) as cantidad FROM pedido GROUP BY estado;
   
   -- Verificar ingresos por mes
   SELECT DATE_FORMAT(fecha, '%Y-%m') as mes, SUM(total) as ingreso 
   FROM pedido WHERE estado != 'Cancelado' 
   GROUP BY DATE_FORMAT(fecha, '%Y-%m');
   ```

### Si no hay datos:

1. **Ejecutar los scripts de datos de ejemplo**
2. **Verificar que las tablas tengan datos**:
   ```sql
   SELECT COUNT(*) FROM pedido;
   SELECT COUNT(*) FROM producto;
   SELECT COUNT(*) FROM cliente;
   ```

## 📱 Responsive Design

Los gráficos se adaptan automáticamente a diferentes tamaños de pantalla:

- **Desktop**: Gráficos en 2 columnas
- **Tablet**: Gráficos en 2 columnas con tamaño reducido
- **Mobile**: Gráficos en 1 columna

## 🎨 Personalización

### Colores de los Gráficos:
- **Azul**: #1976d2 (Ingresos, Productos)
- **Verde**: #10b981 (Clientes nuevos)
- **Amarillo**: #fbc02d (Pendiente)
- **Rojo**: #e53935 (Cancelado)

### Estilos CSS:
Los estilos están en `frontend-erp/src/styles/DashboardPage.css`

## 🔍 Debugging

### Logs Disponibles:
- Dashboard data: Muestra datos generales del dashboard
- Productos más vendidos: Lista de productos con ventas
- Ingresos por mes: Datos de ingresos mensuales
- Pedidos por estado: Distribución de estados
- Clientes nuevos por mes: Registro de clientes nuevos
- Alertas de stock: Productos con stock bajo

### Comandos Útiles:
```bash
# Ver logs del backend
tail -f backend/logs/application.log

# Ver logs del frontend (en la consola del navegador)
# Presiona F12 y ve a la pestaña Console
```

## ✅ Verificación Final

Para verificar que todo funciona correctamente:

1. ✅ Backend corriendo en puerto 8081
2. ✅ Frontend corriendo en puerto 3001
3. ✅ Base de datos con datos de ejemplo
4. ✅ Usuario autenticado
5. ✅ Dashboard cargando sin errores
6. ✅ Gráficos mostrando datos
7. ✅ Tooltips funcionando
8. ✅ Responsive design funcionando

## 🚀 Próximos Pasos

Una vez que los gráficos estén funcionando, puedes:

1. **Personalizar colores** según tu marca
2. **Agregar más gráficos** (tendencias, comparativas)
3. **Implementar filtros** por fecha, categoría, etc.
4. **Agregar exportación** de gráficos (PDF, PNG)
5. **Implementar actualización en tiempo real**

---

**¡Los gráficos deberían mostrar datos reales y actualizarse automáticamente!** 🎉 