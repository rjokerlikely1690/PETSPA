# 🚀 Pet Spa - Configuración Rápida

## 📦 Requisitos Previos
- Java 21
- Node.js 18+ 
- npm o yarn
- Git (opcional)

## ⚡ Configuración en 3 Pasos

### 1️⃣ Instalar Dependencias del Frontend
```bash
cd frontend
npm install
```

### 2️⃣ Iniciar Backend (Terminal 1)
```bash
cd user-service
mvn spring-boot:run
```

### 3️⃣ Iniciar Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

## 🌐 URLs de Acceso
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8081
- **Base de Datos H2**: http://localhost:8081/h2-console

### Credenciales H2:
- JDBC URL: `jdbc:h2:mem:petspa_db`
- Usuario: `SA`
- Password: (vacío)

## 🏗️ Estructura del Proyecto
```
appforpets/
├── frontend/           # React + TypeScript + Material-UI
│   ├── src/
│   │   ├── pages/     # Dashboard, Calendar, Pets, Clients
│   │   └── components/ # Layout, navegación
│   └── package.json
├── user-service/      # Spring Boot Backend
└── src/               # Servicio principal (R2DBC)
```

## 🔧 Funcionalidades Implementadas
✅ Dashboard con estadísticas
✅ Gestión de mascotas
✅ Gestión de clientes  
✅ Calendario de citas
✅ Interfaz responsive con Material-UI
✅ Base de datos H2 en memoria
✅ API REST completa

## 🚨 Solución de Problemas

### Puerto ocupado:
```bash
# Cambiar puerto en user-service/src/main/resources/application.properties
server.port=8082
```

### Error de dependencias:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Limpiar proyecto:
```bash
# Backend
mvn clean
# Frontend
cd frontend && rm -rf node_modules package-lock.json
``` 