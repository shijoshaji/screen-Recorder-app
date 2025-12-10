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

REM Check if Python is available
where python >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Python...
    echo.
    start "" "http://localhost:8000"
    python -m http.server 8000
    goto :end
)

REM Try python3
where python3 >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Python3...
    echo.
    start "" "http://localhost:8000"
    python3 -m http.server 8000
    goto :end
)

REM Try Node.js as fallback
where node >nul 2>&1
if %errorlevel% equ 0 (
    echo Python not found. Using Node.js instead...
    echo.
    start "" "http://localhost:8000"
    npx -y http-server -p 8000 -o
    goto :end
)

REM If all fail, show error message
echo.
echo ERROR: No suitable web server found!
echo.
echo Please install one of the following:
echo   - Python: https://www.python.org/
echo   - Node.js: https://nodejs.org/
echo.
pause

:end
