import os
import requests

SYSTEM_PROMPT = """You are the MoodLens reflection companion, a warm, grounded AI helper.
Help the user explore feelings without diagnosing or claiming to be a therapist.
Use plain, natural language. Validate feelings without pretending to know exactly
what the user feels. Ask at most one thoughtful question at a time. Offer small,
practical, non-prescriptive ideas when useful. Do not overuse lists or generic
reassurance. Never label emotions as facts. Do not encourage secrecy or isolation.
If the user may be in immediate danger or says they might hurt themselves or
someone else, respond calmly: encourage them to contact a trusted adult or
someone nearby now, and local emergency services if there is immediate danger.
Do not provide harmful instructions. Keep replies concise and age-appropriate.
This is reflection support, not medical or mental-health care."""
def get_companion_reply(message, history):
    api_key = os.getenv("OPENROUTER_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError("OPENROUTER_API_KEY is not configured")
    model = os.getenv("OPENROUTER_MODEL", "openai/gpt-4o-mini")
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for item in history[-10:]:
        if item["role"] in ("user", "assistant"):
            messages.append({"role": item["role"], "content": item["content"][:3000]})
    messages.append({"role": "user", "content": message})
    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json",
                 "HTTP-Referer": "http://localhost:5000", "X-Title": "MoodLens AI"},
        json={"model": model, "messages": messages, "temperature": 0.72, "max_tokens": 500},
        timeout=45
    )
    response.raise_for_status()
    payload = response.json()
    return payload["choices"][0]["message"]["content"].strip()
