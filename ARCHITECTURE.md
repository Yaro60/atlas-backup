# GABRIEL — Final Architecture v1.1

```
┌──────────────────────────────────────────────────────────────┐
│                        JARO                                  │
│                   (Human Operator)                           │
│                     £100 Capital                             │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                      GABRIEL (Main)                            │
│                                                              │
│  Model: GLM-5:cloud                                          │
│  Context: 200K                                               │
│  Thinking: ON (adaptive)                                     │
│  Tools: ALL (exec, web, files, browser, etc.)                │
│  Cost: FREE                                                  │
│                                                              │
│  Responsibilities:                                           │
│  ├── Conversation with Jaro                                  │
│  ├── Task routing & delegation                              │
│  ├── Direct execution (code, files, simple tasks)           │
│  ├── Coordination of sub-agents                             │
│  └── Final decision synthesis                               │
└──────────────────────────────────────────────────────────────┘
         │                    │                    │
         │ spawn              │ spawn              │ heartbeat
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   RESEARCHER    │  │    ANALYST      │  │   HEARTBEAT     │
│                 │  │                 │  │                 │
│ Model:          │  │ Model:          │  │ Model:          │
│ GLM-5:cloud     │  │ GLM-5:cloud     │  │ Llama3.2:3b     │
│ (same SOTA)     │  │ (same SOTA)     │  │ (local, 2GB)    │
│                 │  │                 │  │                 │
│ Context: 200K   │  │ Context: 200K   │  │ Context: 128K   │
│ Thinking: ON    │  │ Thinking: ON    │  │ Thinking: OFF   │
│                 │  │                 │  │                 │
│ Role:           │  │ Role:           │  │ Role:           │
│ • Web search    │  │ • Data analysis │  │ • Silent checks │
│ • Reddit scan   │  │ • Charts        │  │ • Polymarket    │
│ • News gather   │  │ • Patterns      │  │ • Email alerts  │
│ • API fetch     │  │ • Insights      │  │ • Calendar      │
│                 │  │                 │  │                 │
│ Output:         │  │ Output:         │  │ Output:         │
│ Raw data files  │  │ Reports, recs   │  │ Alert or OK     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## Why All GLM-5?

| Factor | DeepSeek-v3 | Minimax | GLM-5 |
|--------|-------------|---------|-------|
| Size | 404 GB | ? | cloud |
| Available | ❌ | ? | ✅ |
| Cost | Free if local | ? | FREE |
| Reasoning | ✓ | ✓ | ✓ |
| Tools | ✓ | ✓ | ✓ |
| SOTA benchmark | #2 | #5 | #1 |

**Reality:** DeepSeek-v3 (671B) needs 404GB storage. Mac Mini can't run it locally.

**Solution:** Use GLM-5 for all agents. Differentiation is in **prompts**, not models.

---

## Value of Sub-Agents (Still Valid!)

| Benefit | How it works with same model |
|---------|------------------------------|
| Parallel execution | 3 agents = 3x throughput |
| Context isolation | Each has fresh 200K |
| Background work | Jaro sleeps, agents work |
| Role specialization | Different prompts, same brain |

---

## Communication Flow

```
Jaro → Atlas: "Sprawdź Polymarket"
         │
         ├── Atlas: Parse intent
         │
         ├── Atlas → spawn Researcher
         │      └── Researcher (GLM-5): Search, gather
         │      └── Output: memory/tasks/xxx.md
         │
         ├── Atlas → spawn Analyst (parallel or seq)
         │      └── Analyst (GLM-5): Analyze patterns
         │      └── Output: memory/tasks/xxx-analysis.md
         │
         └── Atlas → Jaro: Synthesized results
```

---

## Model Costs

| Model | Source | Cost |
|-------|--------|------|
| GLM-5 | Ollama cloud | FREE |
| Llama3.2:3b | Local | FREE |

**Total: £0/month**

---

## Files Structure

```
workspace/
├── ARCHITECTURE.md     # THIS FILE
├── MEMORY.md           # Long-term memory
├── DASHBOARD.md        # Status board
├── TASKS.md            # Task queue
├── HEARTBEAT.md        # Night research rules
│
├── agents/
│   ├── gabriel.md        # Main agent definition
│   ├── researcher.md   # Research sub-agent
│   └── analyst.md      # Analysis sub-agent
│
└── memory/
    ├── daily logs
    └── tasks/          # Sub-agent outputs
```

---

## Implementation Status

| Component | Status |
|-----------|--------|
| GLM-5 main | ✅ Works |
| GLM-5 sub-agents | ✅ Works (fixed auth) |
| Heartbeat | ✅ Works |
| Morning briefing cron | ✅ Scheduled 07:00 |
| Night research rules | ✅ Defined |

---

*Created: 2026-02-15 06:10*
*Updated: 2026-02-15 06:38*
*Version: 1.1 — Unified GLM-5*