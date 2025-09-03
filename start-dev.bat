@echo off
echo Starting Infotainment A11y Analyzer Development Environment...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && python run.py"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend Development Server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting up...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
