"""Emotion interpretation using a multi-label GoEmotions model.

The model's labels are grouped into the seven product categories. Scores are
normalized for display; they are not calibrated probabilities or diagnoses.
"""
import re
from functools import lru_cache

MODEL_NAME = "SamLowe/roberta-base-go_emotions"
CATEGORIES = ["Happy", "Sad", "Angry", "Anxious", "Excited", "Stressed", "Calm"]

GROUPS = {
    "Happy": {"joy", "amusement", "gratitude", "love", "optimism", "pride", "approval", "admiration", "desire", "caring"},
    "Sad": {"sadness", "grief", "disappointment", "remorse", "embarrassment"},
    "Angry": {"anger", "annoyance", "disapproval"},
    "Anxious": {"fear", "nervousness", "confusion"},
    "Excited": {"excitement", "surprise", "anticipation"},
    "Stressed": {"disgust", "疲惫", "worry", "realization"},
    "Calm": {"relief", "contentment", "neutral"}
}
# Avoid letting one broad label dominate several categories.
LABEL_TO_GROUP = {label: group for group, labels in GROUPS.items() for label in labels}
EXPLANATIONS = {
    "Happy": "Your words lean toward warmth, appreciation, or positive connection.",
    "Sad": "Your words suggest disappointment, loss, or a lower emotional energy.",
    "Angry": "Your words carry signs of frustration, irritation, or a strong sense that something feels unfair.",
    "Anxious": "Your words suggest uncertainty, worry, or anticipation about what might happen.",
    "Excited": "Your words carry anticipation, energy, or enthusiasm about something ahead.",
    "Stressed": "Your words suggest pressure, overwhelm, or several demands competing for attention.",
    "Calm": "Your words lean toward acceptance, relief, or a more settled state."
}

@lru_cache(maxsize=1)
def _classifier():
    from transformers import pipeline
    return pipeline("text-classification", model=MODEL_NAME, tokenizer=MODEL_NAME, top_k=None, truncation=True)

def _fallback_scores(text):
    """Deterministic fallback if the model is unavailable; clearly disclosed."""
    terms = {
        "Happy": ["happy", "glad", "grateful", "good", "proud", "love", "wonderful"],
        "Sad": ["sad", "lonely", "miss", "cry", "disappointed", "down", "hurt"],
        "Angry": ["angry", "mad", "annoyed", "furious", "unfair", "frustrated"],
        "Anxious": ["anxious", "nervous", "worried", "scared", "afraid", "uncertain"],
        "Excited": ["excited", "can't wait", "thrilled", "looking forward", "amazing"],
        "Stressed": ["stress", "overwhelmed", "pressure", "too much", "exhausted", "deadline"],
        "Calm": ["calm", "peaceful", "relaxed", "okay", "safe", "content"]
    }
    lower = text.lower()
    scores = {k: 0.08 for k in CATEGORIES}
    for category, words in terms.items():
        scores[category] += sum(1.0 for word in words if word in lower)
    return scores, True

def analyze_emotion(text):
    fallback = False
    try:
        output = _classifier()(text[:4000])
        labels = output[0] if output and isinstance(output[0], list) else output
        scores = {k: 0.025 for k in CATEGORIES}
        for item in labels:
            label = str(item["label"]).lower()
            group = LABEL_TO_GROUP.get(label)
            if group:
                scores[group] += float(item["score"])
    except Exception:
        scores, fallback = _fallback_scores(text)

    total = sum(scores.values()) or 1
    distribution = {key: round(value / total * 100, 1) for key, value in scores.items()}
    # Make the visible distribution add up to 100 after rounding.
    difference = round(100 - sum(distribution.values()), 1)
    dominant = max(scores, key=scores.get)
    distribution[dominant] = round(distribution[dominant] + difference, 1)
    ordered = sorted(scores.values(), reverse=True)
    margin = (ordered[0] - ordered[1]) / max(ordered[0], 0.01)
    confidence = min(94, max(38, round(48 + margin * 40)))
    if fallback:
        confidence = min(confidence, 62)
    return {
        "emotion": dominant,
        "confidence": confidence,
        "distribution": distribution,
        "explanation": EXPLANATIONS[dominant],
        "reflection_question": {
            "Happy": "What helped create this feeling, and how could you make space for more of it?",
            "Sad": "What might you need most right now: rest, connection, expression, or a little time?",
            "Angry": "What value or boundary might this frustration be pointing toward?",
            "Anxious": "Which part is within your control, and what is one small next step?",
            "Excited": "What part are you looking forward to most, and why does it matter?",
            "Stressed": "What could be paused, simplified, or shared with someone?",
            "Calm": "What helped you feel settled, and how might you return to it?"
        }[dominant],
        "suggestion": {
            "Happy": "Take a moment to notice what contributed to this feeling. Consider writing down one detail you want to remember.",
            "Sad": "Try giving the feeling some room without judging it. A small check-in with someone you trust may help.",
            "Angry": "A short pause can make it easier to decide what response fits your values. Consider naming the specific thing that bothered you.",
            "Anxious": "Bring your attention to one manageable next step. You do not have to solve everything at once.",
            "Excited": "Capture the idea or possibility while it feels vivid. Choose one realistic action to build on the momentum.",
            "Stressed": "Choose one priority for the next 10 minutes. A brief reset and asking for help can also make the load feel more manageable.",
            "Calm": "Notice what is supporting this steadier moment. You might protect a little time for that again."
        }[dominant],
        "model_note": "Keyword-based fallback used because the Hugging Face model was unavailable." if fallback else "Hugging Face multi-label emotion model"
    }
