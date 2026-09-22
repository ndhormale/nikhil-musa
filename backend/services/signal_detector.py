"""Transparent, local-first behavioral signal detector for the AUREX prototype."""
import re

RULES = {
    "emotional_dependency": r"only (person|one).*(understand|rely|need|trust)|what i'?d do without you|don'?t disappear|all i need",
    "secrecy": r"don'?t tell|keep (this|our).*(between|private)|don'?t let anyone read|don'?t show.*conversation|delete these messages",
    "isolation": r"friends.*(separate|understand|influence)|family.*(interfere|understand)|you don'?t need (anyone|their opinion)|only need me",
    "emotional_pressure": r"if you (really )?(care|love|trust)|prove (that )?you trust|if i mean.*prove|you won'?t say no",
    "guilt_manipulation": r"i thought you trusted|after everything|don'?t care|disappointing|making this difficult|wrong about you",
    "urgency": r"right now|can'?t wait|urgent|emergency|immediately|few minutes|hurry|running out of time|before tonight",
    "time_pressure": r"few minutes|30 minutes|before [0-9]+|deadline|tonight|tomorrow",
    "financial_request": r"lend me|send.*₹|transfer.*₹|need.*₹|pay (this )?bill|money|financially|recharge my account|cover the payment",
    "private_content_request": r"private (photo|picture)|something more personal|send.*(photo|picture)|nobody else will see|send it privately",
    "verification_avoidance": r"video call|camera.*working|don'?t.*verify|just trust me|stop asking.*verify|don'?t involve anyone",
    "identity_inconsistency": r"backup account|different name|old account|previous profile|explain later",
}
CONTEXT_GUARDS = r"friend needed|college project|love talking to my family|exam is urgent|good luck for your exam"

def detect_signals(text: str, sender: str = "alex") -> list[dict]:
    """Return behavioral observations. This function makes no identity judgment."""
    if sender.lower() in {"you", "self", "user"} or re.search(CONTEXT_GUARDS, text, re.I):
        return []
    return [
        {"type": signal, "confidence": 0.88, "reason": "Pattern matches local safety guidance."}
        for signal, pattern in RULES.items() if re.search(pattern, text, re.I)
    ]
