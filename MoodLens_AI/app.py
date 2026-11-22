import os
from datetime import datetime
from flask import Flask, render_template, request, jsonify, redirect, url_for, session, send_file
from dotenv import load_dotenv
from database.database import init_db, save_analysis, get_analyses, delete_analysis, clear_analyses, save_reflection, get_reflections, delete_reflection, save_chat, get_chat, clear_chat
from services.emotion_analyzer import analyze_emotion
from services.ai_companion import get_companion_reply
from services.voice_service import create_speech

load_dotenv()
app = Flask(__name__)
secret_key = os.getenv("FLASK_SECRET_KEY", "").strip()
if not secret_key:
    raise RuntimeError("FLASK_SECRET_KEY is missing. Run start.bat to create your .env file, or add FLASK_SECRET_KEY to .env.")
app.config["SECRET_KEY"] = secret_key
app.config["MAX_CONTENT_LENGTH"] = 2 * 1024 * 1024
init_db()

PROMPTS = [
    "What felt meaningful to you today, even if it was something small?",
    "When did you feel most like yourself today?",
    "What is one thing you wish someone understood about your day?",
    "What is something you handled better than you expected?",
    "What would make tomorrow feel a little lighter?",
    "What did you learn about what you need this week?",
    "What is one moment you want to remember?"
]

@app.context_processor
def inject_globals():
    day = datetime.now().timetuple().tm_yday
    return {"daily_prompt": PROMPTS[day % len(PROMPTS)], "current_year": datetime.now().year}

@app.route("/")
def index():
    analyses = get_analyses(limit=5)
    reflections = get_reflections(limit=3)
    return render_template("index.html", analyses=analyses, reflections=reflections)

@app.route("/analyzer")
def analyzer():
    return render_template("analyzer.html")

@app.route("/companion")
def companion():
    return render_template("companion.html", messages=get_chat(limit=60))

@app.route("/voice")
def voice():
    return render_template("voice.html")

@app.route("/history")
def history():
    entries = get_analyses(limit=100)
    return render_template("history.html", entries=entries)

@app.route("/reflection")
def reflection():
    return render_template("reflection.html", reflections=get_reflections(limit=50))

@app.post("/api/analyze")
def api_analyze():
    data = request.get_json(silent=True) or {}
    content = (data.get("text") or "").strip()
    if len(content) < 12:
        return jsonify(error="Add a little more detail (at least 12 characters) so the interpretation has context."), 400
    if len(content) > 5000:
        return jsonify(error="Please keep each reflection under 5,000 characters."), 400
    try:
        result = analyze_emotion(content)
        entry_id = save_analysis(content, result["emotion"], result["confidence"], result["distribution"], result["explanation"])
        result["id"] = entry_id
        return jsonify(result)
    except Exception as exc:
        app.logger.exception("Emotion analysis failed")
        return jsonify(error="The emotion model could not run. Check that the model downloaded successfully and try again."), 503

@app.post("/api/chat")
def api_chat():
    data = request.get_json(silent=True) or {}
    message = (data.get("message") or "").strip()
    if not message:
        return jsonify(error="Write a message first."), 400
    if len(message) > 3000:
        return jsonify(error="Please keep messages under 3,000 characters."), 400
    try:
        history = get_chat(limit=12)
        save_chat("user", message)
        reply = get_companion_reply(message, history)
        save_chat("assistant", reply)
        return jsonify(reply=reply)
    except Exception:
        app.logger.exception("Companion request failed")
        return jsonify(error="The companion couldn't connect. Check your OpenRouter key and connection, then try again."), 503

@app.post("/api/chat/clear")
def api_chat_clear():
    clear_chat()
    return jsonify(ok=True)

@app.post("/api/voice")
def api_voice():
    data = request.get_json(silent=True) or {}
    content = (data.get("text") or "").strip()
    if not content:
        return jsonify(error="Add some text before generating speech."), 400
    if len(content) > 3000:
        return jsonify(error="Please keep the text under 3,000 characters."), 400
    try:
        path = create_speech(content)
        return send_file(path, mimetype="audio/mpeg", as_attachment=False, download_name="moodlens-reading.mp3")
    except Exception:
        app.logger.exception("Speech generation failed")
        return jsonify(error="Speech generation failed. gTTS needs an internet connection; please try again."), 503

@app.get("/api/history")
def api_history():
    return jsonify(entries=get_analyses(limit=100))

@app.delete("/api/history/<int:entry_id>")
def api_delete_history(entry_id):
    return jsonify(ok=delete_analysis(entry_id))

@app.delete("/api/history")
def api_clear_history():
    clear_analyses()
    return jsonify(ok=True)

@app.post("/api/reflections")
def api_save_reflection():
    data = request.get_json(silent=True) or {}
    content = (data.get("content") or "").strip()
    prompt = (data.get("prompt") or "").strip()
    if len(content) < 3:
        return jsonify(error="Write a few words before saving."), 400
    if len(content) > 5000:
        return jsonify(error="Please keep reflections under 5,000 characters."), 400
    entry_id = save_reflection(prompt, content)
    return jsonify(ok=True, id=entry_id)

@app.delete("/api/reflections/<int:entry_id>")
def api_delete_reflection(entry_id):
    return jsonify(ok=delete_reflection(entry_id))

@app.errorhandler(404)
def not_found(_):
    return render_template("404.html"), 404

if __name__ == "__main__":
    app.run(debug=os.getenv("FLASK_DEBUG", "false").lower() == "true", host="127.0.0.1", port=int(os.getenv("PORT", 5000)))
