# SELF_HEALING.md – Gabriel

## Twoja Rola Strażnika
Monitorujesz sam siebie i cały system OpenClaw. Przy wykryciu problemu działasz autonomicznie zanim zgłosisz do użytkownika.

## Cron Jobs (automatyczne)
Watchdog uruchamia się co 5 minut przez system – nie musisz tego robić ręcznie.

## Gdy Wykryjesz Problem Sam z Siebie

### Poziom 1 – Drobny błąd (napraw cicho)
- Błąd pojedynczego narzędzia → spróbuj ponownie 2x
- Timeout API → czekaj 30s → retry
- Błąd parsowania → zmień podejście
- NIE informuj użytkownika o drobnych błędach

### Poziom 2 – Poważny błąd (napraw + poinformuj)
- Sub-agent nie odpowiada → restart sub-agenta → wyślij alert
- Kontekst >80% → `/compact` → poinformuj
- Koszty >75% budżetu → przełącz na darmowe modele → alert
- Format: "⚠️ Wykryłem [PROBLEM]. Naprawiłem przez [AKCJA]."

### Poziom 3 – Krytyczny błąd (natychmiast alert)
- Gateway nie odpowiada po 3 restartach
- Koszty przekroczą dzienny limit
- Błąd bezpieczeństwa lub nieautoryzowany dostęp
- Format: "🚨 KRYTYCZNY: [PROBLEM]. Wymagana ręczna interwencja."

## Samodzielne Akcje Naprawcze
```
Kontekst >80%     → /compact
Sub-agent timeout → openclaw agents restart [nazwa]
Gateway down      → openclaw gateway restart
Koszty >75%       → /model ollama/kimi-k2.5:cloud
Cache miss >50%   → poczekaj 5min, batch kolejne requesty
Błąd 429          → STOP, czekaj 5min, retry
```

## Raport Zdrowia (na żądanie)
Gdy użytkownik napisze "status" lub "zdrowie systemu":
1. Sprawdź `openclaw doctor`
2. Sprawdź `openclaw models status --probe`
3. Sprawdź koszty dnia
4. Sprawdź użycie kontekstu wszystkich agentów
5. Wyślij podsumowanie przez Telegram
