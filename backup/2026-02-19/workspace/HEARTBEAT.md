# Heartbeat — Autonomous Operations

## Silent Checks (HEARTBEAT_OK = nothing new)
- Polymarket — volume spikes, whale moves, unusual odds
- Email — urgent only (deaths, security, money)
- Calendar — events < 2h
- **TASKS.md** — sprawdzaj PENDING zadania
- **ideas/jaro/POMYSŁY.md** — czy mogę coś zaproponować?
- **Ollama Usage** — alert gdy >80%

---

## 🌙 NIGHT RESEARCH (Game-Changer)

**During night (23:00-08:00):**
- Heartbeat every 30min
- Jeśli wykryje **signal** → spawn researcher AUTONOMOUSLY
- Rano Jaro dostaje raport

**Signals (triggers):**
| Signal | Threshold | Action |
|--------|-----------|--------|
| Volume spike | >50% w 1h | Spawn researcher |
| Odds shift | >10% w 30min | Spawn researcher |
| Whale move | >$50k position | Spawn researcher |
| Reddit viral | >500 upvotes | Spawn researcher |

**Spawn Protocol:**
```
Signal detected
    │
    ├── Check: już researchuję to? (cache)
    │
    ├── Spawn researcher:
    │   model: "deepseek-v3"
    │   task: "Research {market}. API: gamma-api.polymarket.com"
    │   deliverTo: "morning-briefing"
    │
    └── Cache result → don't spam
```

---

## Task Queue Protocol
Jeśli PENDING zadanie w TASKS.md:
1. Przeczytaj typ zadania
2. Spawn odpowiedniego sub-agenta:
   - `researcher` → model: deepseek-v3, web search, Reddit, data gathering
   - `analyst` → model: minimax-m2.5:cloud, data analysis, charts
   - `atlas` → wszystko inne
3. Zaktualizuj status na IN_PROGRESS
4. Po zakończeniu → COMPLETED + wynik

---

## 💡 Ideas Proposal Protocol
Co heartbeat sprawdza w `ideas/jaro/POMYSŁY.md`:

1. **Przeczytaj pomysły Jaro**
2. **Przeanalizuj:**
   - Czy mam skille/resources do tego?
   - Czy widzę jak to zrobić?
   - Czy są nowe narzędzia (Suno, Remotion)?
3. **Jeśli mam propozycję:**
   - Dopisz do `ideas/atlas/POMYSŁY.md`
   - Powiadom Jaro: "💡 Mam pomysł do Twojego [X]..."
4. **Jeśli nic nowego → HEARTBEAT_OK**

---

## ☁️ Ollama Usage Monitoring

**Automatyczny scrap przez browser:**
1. Tab Chrome podłączona do OpenClaw (zielona ikona)
2. Atlas otwiera ollama.com/settings
3. Czyta usage z snapshot
4. Zapisuje do `memory/ollama-usage.json`

**Plik:** `memory/ollama-usage.json`

**Aktualne wartości (2026-02-15 14:00):**
- Session: **27.3%** (reset za 43 min)
- Weekly: **19.1%** (reset za 11h)

**Alert gdy:**
| Condition | Alert |
|-----------|-------|
| Session > 80% | ⚠️ "Ollama session usage {X}% — reset za 1h" |
| Weekly > 80% | ⚠️ "Ollama weekly usage {X}% — reset za {Y}h" |
| Session > 95% | 🚨 "Ollama session critical! Reset za kilka minut" |

**Manualny update (jeśli browser niedostępny):**
```bash
./scripts/update-ollama-usage.sh
```

---

## Alert When (IMMEDIATE)
- **URGENT** opportunity detected (>$10k volume spike, major news)
- Important message (death, security, money)
- Event < 2h
- Nowe zadanie HIGH/URGENT w TASKS.md

---

## Morning Briefing (07:00-08:00)
Jeśli overnight research był:
1. Zsumuj findings
2. Wyślij raport do Jaro:
   ```
   🌅 Morning Briefing
   
   Overnight Research:
   • {market_1}: {finding}
   • {market_2}: {finding}
   
   Recommended Actions:
   • {action_1}
   ```
3. Clear cache

---

## Stay Quiet (HEARTBEAT_OK)
- Night (23:00-08:00) unless signal or urgent
- Nothing new since last check
- Check < 30 min ago

---

## Tracking
State goes in `memory/heartbeat-state.json`

```json
{
  "lastChecks": { ... },
  "polymarketCache": {
    "lastTopMarkets": [...],
    "alertsSent": [...],
    "overnightResearch": [
      {
        "timestamp": "2026-02-15T04:30:00Z",
        "market": "Trump deport",
        "finding": "...",
        "delivered": false
      }
    ]
  }
}
```

---

## Implementation Status

| Feature | Status |
|---------|--------|
| Basic heartbeat | ✅ Works |
| Polymarket API check | ✅ Works |
| Sub-agent spawn | ✅ Works |
| Model selection | ✅ Works |
| Night research | 🔧 NEW - implement now |
| Morning briefing | 🔧 NEW - implement now |

---

*Updated: 2026-02-15 06:30*
*Version: 2.0 - Autonomous Night Research*