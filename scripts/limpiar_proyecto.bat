@echo off
echo 🧹 Limpiando proyecto Pet Spa para transferencia...

echo.
echo 📁 Eliminando node_modules...
if exist "frontend\node_modules" (
    echo Eliminando frontend\node_modules...
    rmdir /s /q "frontend\node_modules"
)

echo.
echo 📁 Eliminando package-lock.json...
if exist "frontend\package-lock.json" (
    echo Eliminando frontend\package-lock.json...
    del "frontend\package-lock.json"
)

echo.
echo 📁 Eliminando directorios target de Maven...
if exist "target" (
    echo Eliminando target principal...
    rmdir /s /q "target"
)

if exist "user-service\target" (
    echo Eliminando user-service\target...
    rmdir /s /q "user-service\target"
)

echo.
echo 📁 Eliminando archivos temporales...
if exist ".vscode" (
    rmdir /s /q ".vscode"
)

if exist "*.log" (
    del "*.log"
)

echo.
echo ✅ Proyecto limpiado exitosamente!
echo 📦 Ahora puedes copiar la carpeta completa al pendrive.
echo.
echo 📝 No olvides:
echo    1. Copiar toda la carpeta 'appforpets'
echo    2. En el nuevo PC, ejecutar 'scripts\setup_rapido.bat'
echo.
pause 