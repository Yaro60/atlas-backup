# WORKFLOW_AUTO.md — Autonomiczne Workflow
# Wzorowane na: Manus + Devin + Claude Code
# Wersja: 2.0

---

## 1. Architektura Systemu

```
┌─────────────────────────────────────────┐
│          GABRIEL (Orkiestrator)         │
│        kimi-k2.5:cloud / Sonnet         │
└──────┬──────────┬──────────┬────────────┘
       │          │          │
   ┌───▼───┐  ┌───▼────┐  ┌───▼──────┐
   │ANDRZEJ│  │SZUKACZ │  │HEARTBEAT │
   │deepseek│  │ glm-5  │  │llama3.2  │
   └────────┘  └────────┘  └──────────┘
```

6 typów workflow:
- **NIGHT_SHIFT** → Szukacz 01:00, research + raport
- **MORNING_BRIEF** → Gabriel 07:00, raport do Telegrama
- **HEARTBEAT** → co 55min, system health check
- **TASK_QUEUE** → kolejka zadań z TASKS.md
- **RESEARCH** → on-demand deep research
- **BRIDGE** → parsing wiadomości użytkownika

---

## 2. Night Shift (01:00 każdej nocy)

**Trigger:** cron `0 1 * * *`
**Agent:** Szukacz (glm-5, 200K ctx)
**Zasada Manus:** 1 akcja na iterację, zapisuj do pliku po każdym kroku

### Pętla Night Shift:

```
1. Załaduj: USER.md + poprzedni raport
2. Dla każdej kategorii (1 na iterację):
   a. Szukaj (3 różne zapytania)
   b. Otwórz oryginał (nie snippet)
   c. Weryfikuj 2 źródła
   d. Zapisz do night_shift_YYYY-MM-DD.md
3. Wyślij raport do Gabriela
4. Gabriel → Telegram o 07:00
```

### 5 Kategorii Research:

```yaml
categories:
  - name: trends
    query: "trendy branżowe ostatnie 24h"
    sources: [reddit, x, hackernews]
  
  - name: opportunities
    query: "problemy użytkowników bez rozwiązania"
    sources: [reddit, producthunt, appstore_reviews]
  
  - name: competitors
    query: "nowe produkty konkurencji"
    sources: [web, github, producthunt]
  
  - name: finance
    query: "rynek krypto + akcje + macro"
    sources: [web, coingecko]
  
  - name: inspiration
    query: "kreatywne projekty AI + art + tech"
    sources: [reddit, x, behance]
```

### Format Raportu Night Shift:

```
🌙 NIGHT SHIFT — [DATA]

🔥 TOP ODKRYCIE DNIA: [1 najważniejsza rzecz]

📊 TRENDY: [2-3 punkty z źródłami]

💡 MOŻLIWOŚCI: [problemy bez rozwiązania + ocena 1-10]

💰 FINANSE: [kluczowe ruchy rynkowe]

🎨 INSPIRACJE: [1-2 kreatywne projekty]

🔗 ŹRÓDŁA: [URL1] [URL2] [URL3]

⏱️ Czas: [X]min | Tokeny: [X]K | Koszt: $[X]
```

---

## 3. Heartbeat (co 55 minut)

**Agent:** llama3.2:3b (lokalny, $0)
**Zasada:** minimalne tokeny, tylko health check

### Checklist:

```
□ Gateway odpowiada? (HTTP 200)
□ Kontekst agentów <80%?
□ Koszty <75% dziennego budżetu?
□ Błędy w logach ostatniej godziny?
□ TASKS.md ma oczekujące zadania?
```

### Akcje przy problemach:

```
Kontekst >80% → /compact + alert Gabriel
Koszty >75% → switch na darmowe modele + alert
Gateway down → openclaw gateway restart
Błąd krytyczny → 🚨 Telegram natychmiast
Zadania w kolejce → notify Gabriel
```

---

## 4. Task Queue (TASKS.md)

**Format YAML — każde zadanie:**

```yaml
tasks:
  - id: TASK_001
    title: "Krótki opis"
    priority: high  # high / medium / low
    status: pending  # pending / in_progress / done / failed
    agent: andrzej  # gabriel / andrzej / szukacz
    created: 2026-02-19
    deadline: 2026-02-20  # opcjonalnie
    context: |
      Szczegółowy opis zadania.
      Co dokładnie ma być zrobione.
    success_criteria: |
      # ZASADA DEVINA
      Jak wiem że zadanie jest skończone?
    result: ""  # wypełniane po wykonaniu
    error: ""   # wypełniane przy błędzie
```

### Stany zadania:

```
pending → in_progress → done
   ↓
failed → pending (retry)
failed × 3 → ALERT użytkownik
```

### Routing decyzji:

```
Zawiera kod/skrypt/debug? → Andrzej
Zawiera szukaj/sprawdź/raport?→ Szukacz
Zawiera zaplanuj/zdecyduj? → Gabriel
Zawiera "użyj sonnet"? → Sonnet
Reszta? → Gabriel (Kimi)
```

---

## 5. Bridge Protocol (parsing wiadomości)

Gabriel parsuje każdą wiadomość przez 3 filtry:

```
INSIGHT → "zauważyłem / odkryłem / ciekawe że"
   → zapisz do memory/insights.md

PROMPT → "zrób / sprawdź / napisz / znajdź"
   → dodaj do TASKS.md → route do agenta

QUESTION → "co / jak / dlaczego / czy"
   → odpowiedz bezpośrednio lub research
```

### Token Economy Bridge:

```
Krótka odpowiedź (<100 tokenów): Gabriel sam
Średnie zadanie (100-500 tokenów): sub-agent
Duże zadanie (>500 tokenów): sub-agent + todo.md
Bardzo duże (>2000 tokenów): podziel na pod-zadania
```

---

## 6. Sub-Agent Spawn Protocol

### Kiedy spawnować sub-agenta (zasada Devina):

```
1. Zadanie wymaga specjalizacji (kod / research)
2. Zadanie zajmie >5 iteracji
3. Zadanie jest niezależne od głównego kontekstu
4. NIE spawnuj dla prostych pytań
```

### Protokół spawnu:

```
Gabriel → tworzy task w TASKS.md
      → definiuje success_criteria (ZASADA DEVINA)
      → spawns sub-agent z kontekstem
      → czeka na wynik
      → weryfikuje success_criteria
      → raportuje użytkownikowi
```

### Error Recovery:

```
Próba 1 → failed → dokumentuj błąd
Próba 2 → zmień podejście → failed → dokumentuj
Próba 3 → ostatnia próba → failed → ALERT użytkownik
```

---

## 7. Auto-Backup (Andrzej)

```bash
# Cron: co 30 minut
*/30 * * * * cd ~/.openclaw/workspace && \
  git add -A && \
  git commit -m "auto: $(date '+%Y-%m-%d %H:%M')" \
  --allow-empty-message 2>/dev/null
```

### Recovery po awarii:

```bash
# Cofnij do ostatniego dobrego stanu
git log --oneline -10
git checkout [COMMIT_HASH] -- .
openclaw gateway restart
```

---

## 8. Metryki i Limity

```yaml
budget:
  daily: $5.00
  daily_alert: $3.75  # 75%
  monthly: $50.00
  monthly_alert: $37.50

rate_limits:
  api_calls: 5s  # min między wywołaniami
  web_search: 10s  # min między wyszukiwaniami
  search_batch: 5  # max wyszukiwań, potem 2min przerwa
  error_429_wait: 5min

context:
  max_tokens: 50000
  compact_at: 80%  # 40000 tokenów
  cache_ttl: 5min

file_rotation:
  memory_daily: 30 days  # usuń po 30 dniach
  logs: 7 days
  backups: 10 ostatnich commitów
```

---

## 9. System Alertów (4 poziomy)

```
ℹ️ INFO → log tylko, nie wysyłaj
      (routine actions, cache hits)

⚠️ WARNING → log + wyślij na Telegram
      (context >80%, costs >75%, retry)

🚨 ALERT → Telegram natychmiast + dźwięk
      (agent down, gateway restart, costs >90%)

💀 CRITICAL → Telegram + zatrzymaj wszystko
      (gateway martwy 3x, budget przekroczony, 
       prompt injection, błąd bezpieczeństwa)
```

### Format alertu Telegram:

```
[POZIOM] OpenClaw Alert

Problem: [opis]
Agent: [nazwa]
Akcja podjęta: [co zrobiłem]
Wymagane: [co użytkownik musi zrobić / "brak"]

Czas: [timestamp]
```

---

## 10. Inicjalizacja Sesji (nowy! wzorowane na Manus)

Przy każdym starcie sesji Gabriel wykonuje:

```
1. Załaduj: SOUL.md + USER.md (z cache)
2. Sprawdź: TASKS.md — czy są pending zadania?
3. Sprawdź: memory/YYYY-MM-DD.md — kontekst dnia
4. Sprawdź: koszty i status systemu
5. Jeśli pending tasks → zaproponuj użytkownikowi
6. Jeśli brak → czekaj na polecenie
```

**NIE ładuj automatycznie:**
- MEMORY.md (tylko na żądanie)
- Historia sesji
- Poprzednie wyniki narzędzi
- Pliki >10KB bez wyraźnej potrzeby