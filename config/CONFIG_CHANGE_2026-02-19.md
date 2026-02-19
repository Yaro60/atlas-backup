# Config Update 2026-02-19

## Zmiany w ~/.openclaw/openclaw.json

Backup: `~/.openclaw/openclaw.json.backup.2026-02-19`

### Nowa konfiguracja:

| Agent | contextTokens | Temperature | Cache TTL |
|-------|---------------|-------------|-----------|
| **gabriel** (orchestrator) | 100k → 100k | 0.3 | 5m |
| **andrzej** (coding) | 100k → 100k | 0.1 | 5m |
| **szukacz** (web) | 50k → 200k | 0.5 | 5m |

### Systemowe zmiany:
- **compaction**: softThreshold 40k (kompaktuj przed 50%)
- **memoryFlush**: enabled, zapis do memory/YYYY-MM-DD.md
- **contextPruning**: 6h TTL, trzymaj 3 ostatnie odpowiedzi
- **memorySearch**: sessionMemory enabled
- **tools**: output limits (max 3000 tokens)
- **heartbeat**: co 55min, llama3.2:3b

### Źródła:
- docs.openclaw.ai (session management/compaction)
- clawhosters.com (recommended 50k-100k context)
- moltfounders.com (memory configuration)

### Restart wymagany:
```bash
openclaw gateway restart
```

---
*Config version: 2026.2.19*
*Applied: 2026-02-19T10:19:00Z*
