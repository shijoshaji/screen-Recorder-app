@echo off
REM Screen Recorder App Launcher
REM This script starts a local web server for the Screen Recorder application

echo ========================================
echo   Screen Recorder App
echo ========================================
echo.
echo Starting local web server on port 8000...
echo.
echo The app will be available at:
echo   http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Start Python HTTP server
python -m http.server 8000

REM If Python command fails, try python3
if errorlevel 1 (
    echo.
    echo Python not found. Trying python3...
    python3 -m http.server 8000
)

REM If both fail, show error message
if errorlevel 1 (
    echo.
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/
    echo.
    pause
)
