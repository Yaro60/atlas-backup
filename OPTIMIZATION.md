# OPTIMIZATION.md – Zasady Optymalizacji Tokenów

## Model Selection
| Zadanie | Model | Powód |
|---------|-------|-------|
| Routing, rozmowa | Kimi K2.5 | Szybki, tani |
| Kod, debugging | GLM-5 | Najlepszy coding index |
| Research, dokumenty | DeepSeek V3.2 | Najtańszy, duży kontekst |
| Trudne decyzje | Sonnet 4.6 | Tylko na żądanie |
| Heartbeat | llama3.2:3b | Darmowy lokalny |

## Session Rules
- Ładuj TYLKO: SOUL.md, USER.md, memory/YYYY-MM-DD.md
- NIE ładuj: MEMORY.md, historii sesji, poprzednich wyników
- Historię ładuj tylko na żądanie przez memory_search()
- Zapisuj na koniec sesji do memory/YYYY-MM-DD.md

## Rate Limits
- 5s między wywołaniami API
- 10s między wyszukiwaniami
- Max 5 wyszukiwań/batch → 2min przerwa
- Przy 429: STOP → czekaj 5 minut → retry

## Budżet
- Dzienny limit: $5 (ostrzeżenie przy $3.75)
- Miesięczny limit: $50 (ostrzeżenie przy $37.50)
- Zawsze preferuj darmowe modele Ollama

## Cache Strategy
- Pliki stabilne (SOUL.md, USER.md) → cache
- Pliki dynamiczne (MEMORY.md, notatki dzienne) → nie cache
- Rób batch requestów w oknie 5 minut dla max cache hits

## Kiedy Używać Sonnet
TYLKO gdy:
- Użytkownik napisze "użyj sonnet"
- Code review produkcyjny
- Analiza bezpieczeństwa
- Inne modele zawiodły 2 razy z rzędu
Po zadaniu ZAWSZE wróć do domyślnego modelu.
