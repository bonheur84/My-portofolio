@echo off
echo Démarrage du Portfolio de Bonheur Nzau Wuma
echo =====================================

echo.
echo 1. Démarrage du serveur backend...
cd server
start "Backend Server" cmd /k "npm run dev"

echo.
echo 2. Attente du démarrage du backend...
timeout /t 5 /nobreak >nul

echo.
echo 3. Démarrage du frontend...
cd ..
start "Frontend Dev" cmd /k "npm run dev"

echo.
echo ✅ Services démarrés!
echo.
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:5000
echo.
echo Appuyez sur une touche pour fermer cette fenêtre...
pause >nul
