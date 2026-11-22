from pathlib import Path
from uuid import uuid4
from gtts import gTTS

AUDIO_DIR = Path(__file__).resolve().parent.parent / "instance" / "audio"
def create_speech(text):
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    path = AUDIO_DIR / f"reading-{uuid4().hex}.mp3"
    gTTS(text=text, lang="en", slow=False).save(str(path))
    return path
