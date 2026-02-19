# Strategia #001: Polymarket Trading Bot (Open Source)

## Nazwa:
`jaredzwick/polymarket-trading-bot` (GitHub)

## Źródło:
GitHub: jaredzwick/polymarket-trading-bot
- Stars: 4
- Language: TypeScript
- Last update: 2026-02-08

## Opis:
Automatyczny bot do tradingu na Polymarket z wieloma strategiami i risk managementem.

## Narzędzia:
- Bun runtime
- SQLite (persistence)
- Event bus architecture
- Polymarket API client

## 3 Główne Strategie:

### 1. Market Maker
**Opis:** Placuje ordery po obu stronach księgi (spread capturing)
**Risk:** Niskie, ale wymaga liquidity
**Edge:** Bid-ask spread

### 2. Momentum
**Opis:** Kopię ceny, trend following
**Risk:** Średnie (false breakouts)
**Edge:** FOMO + volume spikes

### 3. Mean Reversion
**Opis:** Trades przeciwko skrajny moves (z-scores)
**Risk:** Wysokie (może się "wydłużyć")
**Edge:** Overreaction corrections

## Risk Management (KLUCZOWE):
- `MAX_POSITION_SIZE` — limit per pozycja
- `MAX_TOTAL_EXPOSURE` — limit całkowity
- `MAX_DAILY_LOSS` — **halt trading po limicie**
- DRY_RUN mode (domyślny) — test bez prawdziwych $$$
- Graceful shutdown (cancel orders on exit)

## Moja analiza (krytyczna):
- ✅ Ma risk management (to RZADKIE w open source)
- ✅ 3 różne strategie (diversification)
- ✅ SQLite audit trail
- ⚠️ Niskie stars (4) — niezweryfikowane przez community
- ⚠️ Wymaga Bun (nowy runtime, mniej stabilny)
- ⚠️ Nie ma proof of profits

**Rating:** 7/10 (dobra architektura, niezweryfikowane wyniki)

## Do przetestowania:
- [ ] Odpalić w DRY_RUN mode
- [ ] Zobaczyć jakie ma wyniki na historii
- [ ] Zrozumieć dlaczego tylko 4 stars (coś nie działa?)

## Action Items:
1. Sklonować repozytorium
2. Przeanalizować kod (szczególnie risk management)
3. Odpalić w dry-run na obecnych rynkach
4. Zobaczyć czy faktycznie działa

## Jakie pytania:
- Czy działa w 2025? (ostatni update luty 2026)
- Jaki ma sharpe ratio?
- Jak radzi sobie z low-liquidity markets?
