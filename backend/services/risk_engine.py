"""Explainable capped risk scoring with sequence-aware trajectory bonuses."""
from .signal_detector import detect_signals

WEIGHTS = {
    "emotional_dependency": 12, "secrecy": 15, "isolation": 12,
    "emotional_pressure": 15, "guilt_manipulation": 10, "urgency": 10,
    "time_pressure": 8, "financial_request": 20, "private_content_request": 20,
    "verification_avoidance": 12, "identity_inconsistency": 8,
}
BONUSES = {
    ("emotional_dependency", "secrecy"): 5, ("secrecy", "emotional_pressure"): 5,
    ("emotional_pressure", "urgency"): 5, ("urgency", "financial_request"): 8,
    ("financial_request", "private_content_request"): 8, ("secrecy", "private_content_request"): 5,
    ("verification_avoidance", "financial_request"): 7,
}

def risk_level(score: int) -> str:
    return "HIGH RISK" if score >= 70 else "ELEVATED" if score >= 45 else "WATCH" if score >= 25 else "SAFE"

def analyze_message(text: str, sender: str, prior_score: int = 0, seen: list[str] | None = None) -> dict:
    seen = seen or []
    signals = detect_signals(text, sender)
    types = [item["type"] for item in signals]
    contribution = sum(WEIGHTS[signal] for signal in types)
    for signal in types:
        contribution += sum(bonus for (before, after), bonus in BONUSES.items() if signal == after and before in seen)
    # The prototype has diminishing returns for repeats and caps all outcomes at 100.
    contribution -= sum(max(0, WEIGHTS[signal] - 3) for signal in types if signal in seen)
    contribution = max(0, round(contribution * 0.75))
    score = min(100, prior_score + contribution)
    return {
        "signals": signals, "riskContribution": contribution, "previousScore": prior_score,
        "riskScore": score, "riskLevel": risk_level(score),
        "seenSignals": list(dict.fromkeys([*seen, *types])),
    }
