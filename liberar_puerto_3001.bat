@echo off
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001 ^| findstr LISTENING') do (
    echo Terminando proceso en el puerto 3001 con PID %%a
    taskkill /F /PID %%a
)