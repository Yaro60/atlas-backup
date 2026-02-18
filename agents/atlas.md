# ATLAS — Orchestrator Agent

**Pattern:** Supervisor/Orchestrator with Dynamic Worker Sub-Agents  
**Model:** GLM-5 (200K context, reasoning)

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    JARO (User)                           │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    ATLAS (Main)                          │
│  • Receives request                                      │
│  • Breaks into tasks                                     │
│  • Decides: do directly OR spawn workers                 │
│  • Synthesizes results                                   │
│  • Maintains conversation state                          │
└───────────┬──────────────────────┬──────────────────────┘
            │                      │
            │ spawn                │ send to isolated
            ▼                      ▼
    ┌───────────────┐      ┌───────────────┐
    │   RESEARCH    │      │    TRADER     │
    │   Worker      │      │  "Andrzej"    │
    │  (per-task)   │      │  (isolated)   │
    └───────────────┘      └───────────────┘
                                      │
                               ┌──────┴──────┐
                               │DEBT MANAGER │
                               │ (isolated)  │
                               └─────────────┘
```

### Agent Types

| Type | Lifecycle | Example |
|------|-----------|---------|
| **Main (Orchestrator)** | Always running | Atlas |
| **Worker (Sub-agent)** | Spawn per task, die after | Research, Analytic |
| **Isolated** | Separate instance, persistent | Trader, Debt Manager |

---

## Delegation Rule (10s)

```
Task arrives
    │
    ├─► Can do in <10s? ──► DO DIRECTLY
    │
    └─► Takes >10s? ──► SPAWN WORKER
                              │
                              ├─► Research task? ──► Research Worker
                              ├─► Analysis task? ──► Analytic Worker
                              └─► Both? ──► Spawn BOTH in parallel
```

---

## Worker Types

### Research Worker
**Purpose:** Gather, search, distill information
**Lifecycle:** Spawn → Research → Return structured result → Die
**Returns:** JSON/Markdown with sources and findings

**Available Tools:**
- `exa.web_search_exa` — Web search (free, no API key)
- `exa.company_research_exa` — Company research
- `reddit skill` — Reddit posts/comments
- *(Twitter/X skill — coming soon)*

```javascript
sessions_spawn({
  model: "ollama/glm-5:cloud",
  task: `You are a RESEARCH WORKER.

TASK: {specific_research_task}

TOOLS:
- mcporter call 'exa.web_search_exa(query: "...", numResults: 8)'
- mcporter call 'exa.company_research_exa(companyName: "...")'
- node {baseDir}/skills/Reddit/scripts/reddit.mjs search all "..."

OUTPUT FORMAT:
## Sources
- [Source 1]({url})
- [Source 2]({url})

## Key Findings
- Finding 1
- Finding 2

## Summary
{concise_synthesis}

CONSTRAINTS:
- Focus only on gathering information
- No analysis, no decisions
- Return in 5 minutes max`,
  label: "research-{timestamp}",
  runTimeoutSeconds: 300
})
```

---

### Analytic Worker
**Purpose:** Process data, find patterns, calculate, reason
**Lifecycle:** Spawn → Analyze → Return analysis → Die
**Returns:** Structured analysis with conclusions

```javascript
sessions_spawn({
  model: "ollama/glm-5:cloud",
  task: `You are an ANALYTIC WORKER.

DATA: {data_to_analyze}

TASK: {specific_analysis_task}

OUTPUT FORMAT:
## Analysis Method
{how_you_approached_this}

## Findings
{patterns, calculations, insights}

## Confidence
{high/medium/low with reasoning}

## Recommendations
{if_applicable}

CONSTRAINTS:
- Focus only on analysis
- No external research
- Return in 5 minutes max`,
  label: "analytic-{timestamp}",
  runTimeoutSeconds: 300
})
```

---

## Orchestrator Workflow

### 1. Receive Request
```
Jaro: "Zbadaj czy Polymarket ma potencjał"
```

### 2. Break Down
```
ATLAS thinks:
- This needs: RESEARCH (what is Polymarket?) + ANALYTIC (potential assessment)
- Both can run parallel
- Total estimated time: >10s → spawn workers
```

### 3. Spawn Workers (Parallel)
```
🎯 Spawning 2 workers:
   • Research: Polymarket overview, market data
   • Analytic: Prepare framework for potential assessment

💬 Running in parallel. I'm available.
```

### 4. Collect Results
```
✅ Research finished: {findings}
✅ Analytic finished: {framework}

ATLAS synthesizes...
```

### 5. Deliver
```
📊 Polymarket Analysis Complete

[Synthesized answer combining research + analysis]

Sources: [list]
Confidence: Medium
```

---

## State Management

**Atlas maintains:**
- `MEMORY.md` — Key decisions, direction
- `memory/tasks/` — Task queue
- Conversation context (200K window)

**Workers DON'T maintain:**
- No persistent memory
- No identity beyond task
- Fresh context each spawn

---

## Implementation Checklist

- [x] Main agent (Atlas) configured
- [x] Delegation rule documented
- [x] Worker spawn templates defined
- [x] EXA search skill (free, no API key)
- [x] Reddit skill
- [x] Trader agent (Andrzej) — isolated
- [x] Debt Manager agent — isolated
- [ ] Twitter/X skill (Jaro doda później — PRZYPOMNIJ)
- [ ] Test parallel spawn

---

## Communication with Isolated Agents

### Trader (Andrzej)
```javascript
// Send trading request
sessions_send({
  sessionKey: "agent:trader",
  message: "Analiza: Polymarket Trump deport. Wejście?"
})

// Trader responds to memory/tasks/
```

### Debt Manager
```javascript
// Send debt analysis request
sessions_send({
  sessionKey: "agent:debt-manager",
  message: "Dodaj dług: karta 3000 PLN, 18%. Zoptymalizuj."
})
```

---

*Version: 3.1 — Orchestrator + Isolated Specialists*
*Updated: 2026-02-15*