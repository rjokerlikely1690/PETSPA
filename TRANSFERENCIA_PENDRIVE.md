# 💾 Guía de Transferencia por Pendrive - Pet Spa

## 🎯 En el PC Actual (Origen)

### 1. Ejecutar Script de Limpieza
```bash
# Doble clic en:
scripts/limpiar_proyecto.bat
```
**Esto eliminará:**
- `frontend/node_modules` (~200MB)
- `target/` folders (archivos compilados)
- Archivos temporales
- Logs

### 2. Verificar Tamaño Final
El proyecto limpio debe pesar aproximadamente **5-15 MB**

### 3. Copiar al Pendrive
Copiar toda la carpeta `appforpets` al pendrive

## 📁 Estructura a Transferir
```
📁 appforpets/
├── 📁 frontend/
│   ├── 📁 src/
│   ├── 📄 package.json
│   ├── 📄 vite.config.ts
│   └── 📄 tsconfig.json
├── 📁 user-service/
│   ├── 📁 src/
│   └── 📄 pom.xml
├── 📁 src/
├── 📁 scripts/
│   ├── 📄 setup_rapido.bat
│   └── 📄 limpiar_proyecto.bat
├── 📄 SETUP_RAPIDO.md
├── 📄 TRANSFERENCIA_PENDRIVE.md
└── 📄 pom.xml
```

## 🎯 En el PC Nuevo (Destino)

### 1. Copiar Proyecto
Copiar `appforpets` del pendrive al disco duro

### 2. Ejecutar Setup Automático
```bash
# Doble clic en:
scripts/setup_rapido.bat
```

### 3. Alternativa Manual
Si el script no funciona:

```bash
# Terminal 1 - Backend
cd appforpets/user-service
mvn spring-boot:run

# Terminal 2 - Frontend  
cd appforpets/frontend
npm install
npm run dev
```

## ✅ Verificación Final

### URLs de Prueba:
- 🌐 **Frontend**: http://localhost:5173
- 🔧 **API**: http://localhost:8081
- 🗄️ **Base de Datos**: http://localhost:8081/h2-console

### Credenciales H2:
- **JDBC URL**: `jdbc:h2:mem:petspa_db`
- **Usuario**: `SA`
- **Password**: (vacío)

## 🚨 Solución de Problemas

### Error de Puerto Ocupado:
```bash
# Cambiar puerto del backend
# Editar: user-service/src/main/resources/application.properties
server.port=8082
```

### Error de Dependencias:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Error de Java/Node:
- **Java 21**: https://adoptium.net/
- **Node.js 18+**: https://nodejs.org/

## 📊 Tiempo Estimado
- **Limpieza**: 2 minutos
- **Copia a pendrive**: 3-5 minutos
- **Setup en nuevo PC**: 5-10 minutos
- **Total**: ~15 minutos

## 🎉 ¡Listo!
Tu Pet Spa estará funcionando en el nuevo computador con todas las funcionalidades:
✅ Dashboard interactivo
✅ Gestión de mascotas
✅ Gestión de clientes
✅ Calendario de citas
✅ Interfaz Material-UI 