# MoodLens AI — Complete Project

A local Flask-based reflection app with mood interpretation, an AI companion, journal, history, and text-to-speech. Mood interpretations are exploratory and are not diagnoses or medical advice.

## Windows quick start

1. Extract this entire ZIP into a normal folder (for example, `Desktop\MoodLens_Complete`).
2. Open `.env` and replace `PASTE_YOUR_NEW_OPENROUTER_KEY_HERE` with your **newly generated** OpenRouter API key. Do not use the key you previously pasted into chat; revoke that key first. Save the file. A Flask secret key is already generated in `.env`.
3. Double-click `start.bat`. On first launch it creates a Python environment and installs dependencies; this may take several minutes because the emotion model dependencies can be large.
4. The app opens at `http://127.0.0.1:5000`. Keep the terminal window open while using it.

## Requirements

- Windows 10/11
- Python 3.10–3.12 installed and available through the `py` launcher
- Internet connection for package installation, OpenRouter chat, model download, and gTTS

## Manual launch

```powershell
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```

Create `.env` from `.env.example` first and set `OPENROUTER_API_KEY` and a long random `FLASK_SECRET_KEY`.

## Data and privacy

- SQLite data is created locally under `instance/` on first run.
- Chat messages, journal entries, and mood check-ins are stored in that local database.
- AI companion messages are sent to OpenRouter to generate replies. Avoid entering highly sensitive personal information.
- `.env` contains secrets. Never upload it or share it. It is excluded by `.gitignore`.
- This project is a self-reflection tool, not a diagnostic service or a replacement for support from a trusted person or qualified professional.

## Troubleshooting

- If `py` is not recognized, install Python from python.org and enable the Python launcher.
- If package installation fails, use Python 3.10, 3.11, or 3.12 and rerun `start.bat`.
- If AI chat cannot connect, confirm the new OpenRouter key is valid and has available API credits.
- If the emotion model cannot download, check your internet connection and try again. The app has a keyword-based fallback for emotion interpretation.
- Do not close the terminal while the server is running.
