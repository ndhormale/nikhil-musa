# AUREX

**Your Conversation Safety Layer** — a privacy-focused hackathon MVP that identifies escalating behavioral patterns in a conversation. It does not determine a person's identity or criminality.

## Problem

Online exploitation can build gradually through trust, dependency, secrecy, pressure, urgency, and requests. A single word is rarely enough context.

## Solution and core innovation

AUREX scores the **conversation trajectory**. Its local detector normalizes behavioral signals, remembers earlier signals, then applies transparent sequence bonuses when patterns escalate. It presents an explanation and safety guidance rather than an accusation.

## MVP features

- Premium responsive application entry, conversation shell, live chat and persistent safety bubble
- Three playable local scenarios: normal, gradual escalation, and high risk
- Subtle message-level signal explanations, risk history, animated trajectory chart, and one-time high-risk alert
- Safety review, verification guidance, privacy-by-design page, and working preferences
- Deterministic offline risk engine plus a future optional AI adapter seam

## Architecture

`frontend/` is a dependency-free ES module UI so it can be opened locally for a reliable demo. `backend/` is a FastAPI API with separated signal detection, risk engine, and optional AI analyzer modules. The UI is deliberately self-contained in the prototype so it continues to demonstrate even when an API is offline.

## Risk engine

Base signals include emotional dependency, secrecy, isolation, pressure, urgency, financial requests, private-content requests, verification avoidance, and identity inconsistency. Scores cap at 100. Sequence bonuses recognize patterns such as `dependency → secrecy → pressure → urgency → financial request`. Repeated signals have diminishing returns and lightweight contextual guards prevent obvious benign examples from being scored.

Risk levels: **SAFE 0–24**, **WATCH 25–44**, **ELEVATED 45–69**, **HIGH RISK 70–100**.

## Run

Open [frontend/index.html](frontend/index.html) in a browser for the complete interactive demo. If Python is available, serve the API separately:

```bash
cd backend
python -m pip install -r requirements.txt
uvicorn main:app --reload
```

## Demo instructions

Open **Demo Scenarios**, choose **Gradual Escalation**, and press **Play scenario**. Messages arrive one at a time, the bubble transitions through safety levels, and a high-risk alert opens at the threshold. Select **Review safety signals** to inspect the explanation, audit trail, recommendations, trajectory, verification guidance, and privacy controls.

## Privacy approach

The prototype analyzes conversation behavior rather than people. It does not scrape social networks, verify identities, process payments, report users, or label anyone a scammer. Local demo data only is retained in memory.

## Future scope

On-device analysis, multilingual support, messaging integrations, voice/image safety analysis, privacy-preserving learning, advanced contextual models, and user-controlled trusted-contact workflows.
