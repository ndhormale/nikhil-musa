"""Optional LLM integration seam. Local deterministic analysis remains the default."""
import os

def analyze_with_ai(message: str, conversation_history: list[dict]) -> dict | None:
    """Connect an approved provider here when AI_API_KEY is configured.

    The contract intentionally only permits behavioral signals, never identity or
    criminality claims. Returning None uses the local rules engine.
    """
    if not os.getenv("AI_API_KEY"):
        return None
    # Deliberately no external call in this safe, offline-ready MVP.
    return None
