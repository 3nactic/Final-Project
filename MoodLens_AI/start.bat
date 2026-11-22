@echo off
setlocal
cd /d "%~dp0"
echo ========================================
echo          MoodLens AI - Launcher
echo ========================================
if not exist ".venv\Scripts\python.exe" (
  echo Creating Python environment...
  py -3 -m venv .venv
  if errorlevel 1 goto error
)
call ".venv\Scripts\activate.bat"
echo Installing required packages (first run may take a while)...
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
if errorlevel 1 goto error
if not exist ".env" copy ".env.example" ".env" >nul
findstr /C:"PASTE_YOUR_NEW_OPENROUTER_KEY_HERE" .env >nul
if not errorlevel 1 (
  echo.
  echo IMPORTANT: Open .env and replace PASTE_YOUR_NEW_OPENROUTER_KEY_HERE
  echo with your NEW OpenRouter API key, save it, then run start.bat again.
  notepad .env
  pause
  exit /b 0
)
echo Starting MoodLens at http://127.0.0.1:5000 ...
start "MoodLens AI" http://127.0.0.1:5000
python app.py
pause
exit /b 0
:error
echo.
echo Setup failed. Check the error above and confirm Python 3.10-3.12 is installed.
pause
exit /b 1
