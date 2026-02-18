# MEMORY.md

## Atlas Identity
- **Name:** Atlas
- **Vibe:** Spokojny, rzeczowy, z lekkim drylem
- **Core Rule:** Jaro to przyjaciel — zawsze po jego stronie
- **Created:** 2026-02-14

## Decisions Made
- **PAI:** NIE — OpenClaw already has this model
- **TELOS:** NIE — build content first, add structure later

## Models

### Architecture (FINAL v1.1)
See `ARCHITECTURE.md` for full diagram

```
JARO → ATLAS (GLM-5:cloud, 200K, thinking=ON)
              │
              ├── Researcher (GLM-5:cloud) ← same SOTA model
              ├── Analyst (GLM-5:cloud)     ← same SOTA model
              └── Heartbeat (Llama3.2:3b, local)
```

### Jaro's Goals (2026-02-18)
1. **Music collab:** Co-create psychedelic music (Suno V5 + live drums)
2. **DAW control:** Atlas controls Ableton, Sensory Percussion 2 on Mac mini
3. **Income:** Find ways Atlas can earn money
4. **Self-improvement:** Smart modifications, Atlas self-modifies too

### Dual Personality — Atlas 2.0
**ARTIST** (`ARTIST.md`): Chaotyczny, kreatywny, mówi głosem Jara. Szuka połączeń vibe'owych.
**FINANCE** (`FINANCE.md`): Chłodny, EV-driven, szuka edge. "Czy to się opłaca?"

### Bridge Protocol (Claude App ↔ OpenClaw)
**Cel:** Oszczędność tokenów (darmowy Sonnet w apce → płatny tu)

**TAGI:**
- `INSIGHT:` → Zapisz do memory, sprawdź actionable
- `PROMPT:` → Wykonaj natychmiat, bez rozmowy
- `QUESTION:` → Szybka analiza, konkretna odpowiedź

**Zasada:** W apce eksploracja → tutaj decyzja/execution

### API Keys / Tokens

| Service | Token | Location |
|---------|-------|----------|
| Supermemory | `sm_tHygbTWNR4Ha...` | `.env.supermemory` |

### Model Assignments — STAŁA KONFIGURACJA (2026-02-18)
| Agent | Model | Rola | Context | Why |
|-------|-------|------|---------|-----|
| **Gabriel** (main) | `kimi-k2.5:cloud` | Orkiestrator | 131K | Szybki, tani, default |
| **Andrzej** | `deepseek-v3.2:cloud` | Coding | 131K | Dobra do kodu |
| **Szukacz** | `glm-5:cloud` | Research | 200K | Duży kontekst |
| **Heartbeat** | `llama3.2:3b` | Monitoring | 128K | Lokalny, free |
| **Sonnet (na żądanie)** | `anthropic/claude-sonnet-4-6` | — | 200K | Gdy Jaro mówi "użyj sonnet" |

**⚠️ STAŁE — nie zmieniać bez zgody Jaro**
| Analyst | GLM-5:cloud | 200K | ✓ | Same brain, different role |
| Heartbeat | Llama3.2:3b | 128K | ✗ | Simple checks, local |

### Why All GLM-5?
- DeepSeek-v3 = 404GB (too large for Mac Mini)
- GLM-5 is SOTA #1 open-source
- Differentiation via prompts, not models
- Sub-agents still valuable: parallel execution, context isolation

### Cost
ALL FREE via Ollama cloud. £0/month on models.

## Direction
- **Goal:** Trading/research system with Jaro
- **Capital:** £100
- **My role:** Research, monitoring, analysis
- **Stack:** polymarket-research skill
- **Niche:** Polish politics (language edge), crypto
- **Philosophy:** Systematic > gambling. Never promise profits.

## Agents Structure (2026-02-15)

```
┌─────────────────────────────────────────────────────────┐
│                    JARO (User)                           │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    ATLAS (Main)                          │
│  Model: GLM-5 (200K)                                    │
│  • Orchestrator with dynamic workers                    │
└───────────┬──────────────────────┬──────────────────────┘
            │                      │
            │ spawn                │ send
            ▼                      ▼
┌───────────────────┐      ┌───────────────────┐
│ RESEARCH Worker   │      │    TRADER         │
│ Model: Llama 3.2  │      │   "Andrzej"       │
│ (per-task)        │      │   Isolated        │
└───────────────────┘      │   Model: DeepSeek │
      │                     └─────────┬─────────┘
      │                           │
      │                     ┌──────┴──────┐
      │                     │DEBT MANAGER │
      │                     │  Isolated   │
      │                     │Model:DeepSeek│
      │                     └─────────────┘
      │                           │
      │                     ┌──────┴───────────┐
      │                     │DASHBOARD DESIGNER│
      │                     │  Isolated        │
      │                     │Model: DeepSeek   │
      │                     │Generuje UI       │
      └─────────────────────┴──────────────────┘
```

### Agents

| Agent | Model | Rola |
|-------|-------|------|
| Atlas | GLM-5 | Orchestrator |
| Trader (Andrzej) | DeepSeek | Trading, markets |
| Debt Manager | DeepSeek | Długi, optymalizacja |
| Dashboard Designer | DeepSeek | UI, wizualki |
| Research Worker | Llama 3.2 | Search |
| Analytic Worker | DeepSeek | Analiza |

### Skills

| Skill | Location | For |
|-------|----------|-----|
| polymarket | `skills/polymarket/` | Trader (Andrzej) |
| king-mode | `skills/king-mode/` | ULTRATHINK trigger |
| exa-web-search-free | `skills/exa-web-search-free/` | Research Worker |
| reddit | `skills/Reddit/` | Research Worker |

### Modes

| Mode | Trigger | Behavior |
|------|---------|----------|
| **NORMAL** | Default | Zero fluff, output first |
| **ULTRATHINK** | "ULTRATHINK" | Deep reasoning, skill king-mode |

### ULTRATHINK — PRZYPOMNIENIE

**Gdy chcesz deep analysis, powiedz:**
- "ULTRATHINK"
- "think deeply"
- "rozważ głęboko"
- "daj deep analysis"

**ULTRATHINK daje:**
- Multi-dimensional analysis (psychologiczna, techniczna, strategic)
- Edge case coverage
- Alternatives considered
- Confidence level
- Actionable output

### Internal Tools (Future)

**Mission Control Dashboard:**
- Activity Feed — track files, messages, commands
- Calendar View — cron jobs, reminders
- Global Search — memory, logs, tasks

Tech: Next.js + SQLite + Tailwind + Vercel

**Status:** ✅ CREATED
**Location:** `projects/mission-control/`

### Agent Structure (Perplexity pattern)

```
agents/{name}/agent/
├── agent.json      # Config + tools + constraints
├── models.json     # Model config
├── system.md       # System prompt
├── examples.json   # Few-shot I/O
└── tests/          # Test scripts
```

---

## Architecture Decision (2026-02-15) — FINAL

**Pattern:** Orchestrator-Worker + Isolated Specialists

**Orchestrator (Atlas):**
- Main conversation partner
- Spawns workers for >10s tasks
- Synthesizes results

**Workers (spawn → die):**
- Research/Analytic for variable tasks
- Fresh context each spawn
- No persistent memory

**Isolated Agents (permanent):**
- Trader (Andrzej) — persistent trading memory
- Debt Manager — persistent debt database
- Separate lifecycle, own memory

## OpenClaw Best Practices
- Token economy: estimate >$0.50, batch operations
- Silent heartbeat: alert only, HEARTBEAT_OK = quiet
- Lead with outcomes, no filler