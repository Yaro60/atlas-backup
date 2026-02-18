# 🤖 Multi-Agent Setup - Gabriel System

## Struktura Agentów

```
Ty (Telegram)
↓
[Gabriel – Orkiestrator] ← Ty teraz tu jesteś
kimi-k2.5:cloud (DARMOWY)
↓
┌──┴──────────┐
[Andrzej]    [Szukacz]
deepseek-v3.2 glm-5:cloud
(DARMOWY)    (DARMOWY)
```

## Agenci

| Agent | Model | Rola | Komenda spawn |
|-------|-------|------|---------------|
| **Gabriel** | kimi-k2.5:cloud | Orkiestrator, rozmowa | — (main) |
| **Andrzej** | deepseek-v3.2:cloud | Kod, tech | `spawn andrzej` |
| **Szukacz** | glm-5:cloud | Research, dokumenty | `spawn szukacz` |
| **Heartbeat** | llama3.2:3b | Monitoring | auto |

## Sonnet na żądanie

**Komenda:** `użyj sonnet` lub `/model anthropic/claude-sonnet-4`

**Koszt:** $3/$15 per 1M tokens (płatne)

**Używaj gdy:**
- Trudne decyzje architektoniczne
- Delikatne sytuacje wymagające taktu
- Complex reasoning wymagające najwyższej jakości

## Komendy

```bash
# Spawn agenta
spawn andrzej "napisz skrypt do X"
spawn szukacz "znajdź info o Y"

# Lista agentów
agents list

# Zabij agenta
subagents kill <id>

# Przełącz na Sonnet
/model anthropic/claude-sonnet-4

# Wróć do darmowego
/model ollama/kimi-k2.5:cloud
```

## Szacowany koszt miesięczny

| Scenariusz | Koszt |
|------------|-------|
| Tylko darmowe modele | **$0** |
| 10x Sonnet miesięcznie | **~$15** |
| 50x Sonnet miesięcznie | **~$75** |

## Konfiguracja

Pliki agentów:
- `agents/gabriel/agent.json` + `system.md`
- `agents/andrzej/agent.json` + `system.md`
- `agents/szukacz/agent.json` + `system.md`

Config: `~/.openclaw/openclaw.json`

---

**Status:** ✅ Wdrożone
**Data:** 2026-02-18