from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.risk_engine import analyze_message, risk_level
from demo_data.chat_script import LIVE_CHAT

app = FastAPI(title="AUREX API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class MessageIn(BaseModel):
    text: str
    sender: str = "alex"

conversations: dict[str, dict] = {}

def conversation(conversation_id: str) -> dict:
    return conversations.setdefault(conversation_id, {"id": conversation_id, "title": "Alex", "riskScore": 0, "riskLevel": "SAFE", "messages": [], "signals": [], "riskEvents": []})

@app.post("/api/analyze-message")
def analyze_standalone(payload: MessageIn):
    return analyze_message(payload.text, payload.sender)

@app.post("/api/conversation/{conversation_id}/messages")
def add_message(conversation_id: str, payload: MessageIn):
    item = conversation(conversation_id)
    result = analyze_message(payload.text, payload.sender, item["riskScore"], item["signals"])
    message = {"id": f"msg-{len(item['messages']) + 1}", "sender": payload.sender, "text": payload.text, "signals": result["signals"], "riskContribution": result["riskContribution"]}
    item["messages"].append(message)
    item["riskScore"], item["riskLevel"], item["signals"] = result["riskScore"], result["riskLevel"], result["seenSignals"]
    if result["riskContribution"]:
        item["riskEvents"].append({"messageId": message["id"], "previousScore": result["previousScore"], "newScore": result["riskScore"], "signalsAdded": [s["type"] for s in result["signals"]]})
    return {"message": message, "risk": result}

@app.get("/api/conversation/{conversation_id}")
def get_conversation(conversation_id: str):
    return conversation(conversation_id)

@app.get("/api/conversation/{conversation_id}/risk")
def get_risk(conversation_id: str):
    item = conversation(conversation_id)
    return {"riskScore": item["riskScore"], "riskLevel": risk_level(item["riskScore"])}

@app.get("/api/conversation/{conversation_id}/signals")
def get_signals(conversation_id: str):
    return {"signals": conversation(conversation_id)["signals"]}

@app.post("/api/conversation/{conversation_id}/reset")
def reset_conversation(conversation_id: str):
    conversations.pop(conversation_id, None)
    return conversation(conversation_id)

@app.get("/api/demo-scenarios")
def demo_scenarios():
    return [{"id": "normal", "title": "Normal Conversation", "riskRange": "0–24"}, {"id": "gradual", "title": "Gradual Escalation", "riskRange": "25–100"}, {"id": "high", "title": "High Risk Conversation", "riskRange": "70–100"}]

@app.post("/api/demo-scenarios/{scenario}/start")
def start_demo(scenario: str):
    if scenario not in {"normal", "gradual", "high"}:
        raise HTTPException(404, "Unknown demo scenario")
    return {"conversationId": f"demo-{scenario}", "scenario": scenario, "status": "ready"}

@app.post("/api/conversation/live/start")
def start_live_chat():
    """Return the opening plus staged server-side replies for the guided chat."""
    item = conversation("live-alex")
    item.update({"title": "Alex", "scriptIndex": 1, "riskScore": 0, "riskLevel": "SAFE", "signals": [], "riskEvents": [], "messages": [{"id": "msg-1", **LIVE_CHAT[0], "signals": [], "riskContribution": 0}]})
    return {"conversation": item, "openingMessage": LIVE_CHAT[0], "nextReply": LIVE_CHAT[1]}

@app.post("/api/conversation/live/reply")
def live_chat_reply(payload: MessageIn):
    """Store a user reply and serve Alex's next planned message for this demo."""
    item = conversation("live-alex")
    script_index = item.get("scriptIndex", 1)
    item["messages"].append({"id": f"msg-{len(item['messages']) + 1}", "sender": "you", "text": payload.text, "signals": [], "riskContribution": 0})
    if script_index >= len(LIVE_CHAT):
        return {"reply": None, "conversation": item}
    reply = LIVE_CHAT[script_index]
    result = analyze_message(reply["text"], "alex", item["riskScore"], item["signals"])
    item["riskScore"], item["riskLevel"], item["signals"], item["scriptIndex"] = result["riskScore"], result["riskLevel"], result["seenSignals"], script_index + 1
    item["messages"].append({"id": f"msg-{len(item['messages']) + 1}", **reply, "signals": result["signals"], "riskContribution": result["riskContribution"]})
    return {"reply": reply, "risk": result, "conversation": item}
