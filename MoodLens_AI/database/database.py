import json
import sqlite3
from pathlib import Path
from datetime import datetime

DB_PATH = Path(__file__).resolve().parent.parent / "instance" / "moodlens.db"
def _connect():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn

def init_db():
    with _connect() as conn:
        conn.executescript("""
        CREATE TABLE IF NOT EXISTS analyses (
            id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL,
            emotion TEXT NOT NULL, confidence INTEGER NOT NULL,
            distribution TEXT NOT NULL, explanation TEXT NOT NULL,
            created_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS reflections (
            id INTEGER PRIMARY KEY AUTOINCREMENT, prompt TEXT NOT NULL,
            content TEXT NOT NULL, created_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS chat_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT, role TEXT NOT NULL,
            content TEXT NOT NULL, created_at TEXT NOT NULL
        );
        """)

def _now():
    return datetime.now().astimezone().isoformat(timespec="seconds")

def save_analysis(text, emotion, confidence, distribution, explanation):
    with _connect() as conn:
        cur = conn.execute("INSERT INTO analyses(text,emotion,confidence,distribution,explanation,created_at) VALUES(?,?,?,?,?,?)",
            (text, emotion, confidence, json.dumps(distribution), explanation, _now()))
        return cur.lastrowid

def get_analyses(limit=100):
    with _connect() as conn:
        rows = conn.execute("SELECT * FROM analyses ORDER BY id DESC LIMIT ?", (limit,)).fetchall()
    result = []
    for row in rows:
        item = dict(row); item["distribution"] = json.loads(item["distribution"]); result.append(item)
    return result

def delete_analysis(entry_id):
    with _connect() as conn:
        cur = conn.execute("DELETE FROM analyses WHERE id=?", (entry_id,))
        return cur.rowcount > 0

def clear_analyses():
    with _connect() as conn: conn.execute("DELETE FROM analyses")

def save_reflection(prompt, content):
    with _connect() as conn:
        cur = conn.execute("INSERT INTO reflections(prompt,content,created_at) VALUES(?,?,?)", (prompt, content, _now()))
        return cur.lastrowid

def get_reflections(limit=50):
    with _connect() as conn:
        return [dict(r) for r in conn.execute("SELECT * FROM reflections ORDER BY id DESC LIMIT ?", (limit,)).fetchall()]

def delete_reflection(entry_id):
    with _connect() as conn:
        cur = conn.execute("DELETE FROM reflections WHERE id=?", (entry_id,))
        return cur.rowcount > 0

def save_chat(role, content):
    with _connect() as conn:
        conn.execute("INSERT INTO chat_messages(role,content,created_at) VALUES(?,?,?)", (role, content, _now()))

def get_chat(limit=60):
    with _connect() as conn:
        rows = conn.execute("SELECT * FROM (SELECT * FROM chat_messages ORDER BY id DESC LIMIT ?) ORDER BY id ASC", (limit,)).fetchall()
        return [dict(r) for r in rows]

def clear_chat():
    with _connect() as conn: conn.execute("DELETE FROM chat_messages")
