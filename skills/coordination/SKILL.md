# Coordination Skill

Use when: managing tasks, spawning sub-agents, orchestrating work.

## Task Queue Operations

### Read Tasks
```bash
read TASKS.md
```

### Create Task
```markdown
---
id: 2026-02-14-001
status: PENDING
assigned_to: researcher
created: 2026-02-14T23:50:00Z
priority: MEDIUM
requester: Jaro
---

## Opis
Sprawdź sentyment na Reddit o Bitcoin

## Kontekst
-

## Wynik
—

## Uwagi
-
```

### Update Status
```
PENDING → IN_PROGRESS → COMPLETED/FAILED
```

## Spawn Sub-Agent

```javascript
sessions_spawn({
  task: "Research Bitcoin sentiment on Reddit in the last 24h",
  agentId: "researcher",
  model: "llama3.2:3b",
  cleanup: "keep"  // or "delete" after completion
})
```

## Routing Logic

| Keywords | Spawn |
|----------|-------|
| sprawdź, znajdź, research, web, reddit | researcher (llama3.2) |
| analizuj, dane, wykres, csv, excel | analyst (minimax) |
| proste pytanie, konfiguracja | handle self |
| niejasne | ask for clarification |

## Sub-Agent Lifecycle

```
1. Atlas parse task
2. Create task in TASKS.md (PENDING)
3. Spawn sub-agent with context
4. Update TASKS.md (IN_PROGRESS)
5. Sub-agent works independently
6. Sub-agent writes result to memory/tasks/{id}.md
7. Sub-agent updates TASKS.md (COMPLETED)
8. Sub-agent pings Atlas: "Done: {id}"
9. Atlas reads result, summarizes for Jaro
```

## Agent Definitions

Located in `agents/`:
- `atlas.md` — Main orchestrator
- `researcher.md` — Research specialist
- `analyst.md` — Data analysis specialist