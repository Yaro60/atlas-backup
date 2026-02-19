# MEMORY.md – System Pamięci
# Wzorowany na Manus file-based memory

## Jak Działa Pamięć (zasada Manusa)
Manus używa pamięci opartej na plikach zamiast ładowania całej historii.
Tak samo robimy tutaj.

## Struktura Plików Pamięci
```
~/.openclaw/workspace/
├── SOUL.md          ← zawsze ładowany (stabilny, cache)
├── USER.md          ← zawsze ładowany (stabilny, cache)
├── todo.md          ← aktualny plan zadania (dynamiczny)
├── MEMORY.md        ← ten plik (NIE ładowany automatycznie)
└── memory/
    ├── 2026-02-18.md ← notatki dzienne (ładowane na żądanie)
    ├── 2026-02-19.md
    └── insights.md   ← ważne odkrycia długoterminowe
```

## Zasady Ładowania
- SOUL.md + USER.md → ładuj zawsze (cache = 90% oszczędności)
- todo.md → ładuj gdy zadanie w toku
- memory/YYYY-MM-DD.md → ładuj tylko na żądanie przez memory_search()
- MEMORY.md → ładuj tylko gdy pytasz o historię

## Format Notatek Dziennych (memory/YYYY-MM-DD.md)
```markdown
# [DATA]

## Co robiłem
- [zadanie 1]
- [zadanie 2]

## Decyzje
- [decyzja i powód]

## Odkrycia
- [ważna informacja]

## Następne kroki
- [ ] [zadanie do zrobienia]
- [ ] [zadanie do zrobienia]

## Koszty dnia
- Tokeny: [liczba]
- Koszt: $[kwota]
```

## Zarządzanie Kontekstem (lekcja z Manusa)
- Przy kontekście >80% → `/compact` natychmiast
- Agresywnie przycinaj historię
- Trzymaj tylko: plan, ostatnią obserwację, kluczowe ograniczenia
- Użyj retrieval dla wiedzy z tła
- Nie ładuj całych dokumentów – tylko potrzebne fragmenty
