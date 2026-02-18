# BRIDGE.md — Protocol Claude App ↔ Atlas

## Co to jest
System komunikacji między darmowym Sonnetem (Claude App na telefonie/Mac) a płatnym Atlasem (OpenClaw). Cel: oszczędność tokenów.

## Jak działa

### Ty (w Claude App)
Format wiadomości zawsze z TAGIEM na początku:

```
INSIGHT: Rozmawiałem z Sonnetem o trendach w AI muzyce. 
Wnioski: Suno V5 ma nowy model perkusyjny który lepiej 
współpracuje z live instruments. To nasz edge.

PROMPT: Stwórz psychodeliczny riff w stylu Tame Impala 
ale z polskimi folkowymi motywami. Tempo 145 BPM.

QUESTION: Czy warto teraz inwestować w Polymarket 
given ze mamy wybory w UK w 2026?
```

### Atlas (w OpenClaw)
Parsuje tag → wykonuje → odpowiada KRÓTKO (max 2-3 zdania).

## TAGI

### INSIGHT
**Kiedy:** Masz głęboką rozmowę z Sonnetem w aplikacji i chcesz przekazać "mięso".

**Atlas robi:**
- Zapisuje do `memory/insights/YYYY-MM-DD.md`
- Sprawdza czy insight ma actionable value
- Jeśli tak: tworzy task/pomysł
- Odpowiada: "Zapisano. [jeden zdanie podsumowujące]"

### PROMPT
**Kiedy:** Sonnet w aplikacji wygenerował ci coś dobrego i chcesz użyć tu.

**Atlas robi:**
- Wykonuje natychmiast (Suno, research, kod)
- Zwraca wynik (fik lub "Done")
- Nie rozmawia długo — execution only

### QUESTION
**Kiedy:** Sonnet w aplikacji dał ci pytanie lub wątpliwość, którą chcesz zweryfikować tu.

**Atlas robi:**
- Szybka analiza (data, fakty, liczby)
- Odpowiada bez gdybania
- Jeśli brak danych: "Nie mam danych. Zbadam."

## Zasady Token Economy

### W Claude App (darmowy Sonnet)
✅ DOBRE:
- Długie brainstormingi (eksploracja)
- "Co gdyby..." scenariusze
- Generowanie pomysłów (quantity)
- Etyczne dylematy, filozofia
- Creative writing, prompty

❌ ZŁE (marnowanie za darmo):
- Wielokrotne "czy możesz powtórzyć..."
- Nieefektywne rozmowy bez celu

### W OpenClaw (płatny Sonnet/Kimi)
✅ DOBRE:
- Decyzje finalne (quality)
- Wykonanie (Suno, trade, deploy)
- Code review, architektura
- Analiza danych (cytaty, fakty)
- Kiedy mówisz "użyj sonnet" (dla trudnych rzeczy)

❌ ZŁE (bo płacimy):
- Brainstorming bez celu
- Eksploracja bez akcji
- Powtarzanie tego co powiedziano

## Protocol w akcji

### Przykład 1: Muzyka
**Jaro w Claude App:**
```
INSIGHT: Rozmawialiśmy 20 min o psychodelicznej muzyce. 
Wniosek: najlepsze wyniki Suno daje prompt z konkretnymi 
instrumentami + wymienny gatunek np "psychedelic rock 
meets traditional Mongolian throat singing". 
Zapisz to jako technikę.
```

**Atlas robi:**
1. Zapisuje do `memory/music-techniques.md`
2. Tworzy task: "Przetestuj tę technikę na 3 riffach"
3. Odpowiada: "Technika zapisana. Task stworzony. Testujemy?"

### Przykład 2: Trading
**Jaro w Claude App:**
```
QUESTION: Sonnet sugeruje że Polymarket ma overvalue 
na tech stocks. Jak to sprawdzić?
```

**Atlas robi:**
1. Fetch Polymarket tech markets
2. Check volume, price, order book
3. Odpowiada: "Tech markets: [X] overvalue potwierdzone. 
   Volume -15% vs avg. Nie graj."

### Przykład 3: Execution
**Jaro w Claude App:**
```
PROMPT: Wygeneruj mi 5 pomysłów na kanał YouTube 
o AI music + live drums. Wybrałem najlepsze:
"Human vs AI Drum Battle: who grooves harder?"
Wykonaj tutaj research czy to już istnieje.
```

**Atlas robi:**
1. Search YouTube "AI drum battle", "human vs AI drums"
2. Analiza konkurencji
3. Odpowiada: "6 podobnych filmów, najpopularniejszy: 
   2.3M views. Gap: brak polskiego kąta. 
   Sugeruję: 'Polish drummer vs AI - folk edition'."

## Error Handling

**Jeśli wiadomość bez TAGU:**
Atlas: "Brak tagu (INSIGHT/PROMPT/QUESTION). 
Dodaj tag aby oszczędzić tokeny."

**Jeśli niejasne co zrobić:**
Atlas: "Nie rozumiem. Użyj: INSIGHT (zapisz), 
PROMPT (wykonaj), lub QUESTION (sprawdź)."

## Storage

Insights zapisane w:
- `memory/insights/` — surowe
- `memory/patterns/` — wzorce wykryte
- `memory/actionable/` — gotowe do działania

Bridge handler: `scripts/bridge-handler.sh`
(auto-parsuje wiadomości z Telegram/Discord z tagami)

---
Created: 2026-02-18
Version: 1.0