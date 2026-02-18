---
name: polymarket
description: Polymarket API integration for prediction market analysis. Fetch markets, prices, orderbooks, and trading data.
metadata: {"clawdbot":{"emoji":"📈"}}
---

# Polymarket Skill

Prediction market data for trading agent (Andrzej).

## API Endpoints

| API | Base URL | Purpose |
|-----|----------|---------|
| Gamma | `https://gamma-api.polymarket.com` | Markets, metadata, prices |
| CLOB | `https://clob.polymarket.com` | Orderbook, orders, trades |
| Data | `https://data-api.polymarket.com` | Positions, history |

## Commands

### Top Markets by Volume
```bash
curl -s "https://gamma-api.polymarket.com/markets?limit=10&active=true&closed=false&sort=volume" | jq '.[].question'
```

### Market Details
```bash
curl -s "https://gamma-api.polymarket.com/markets/{slug}"
curl -s "https://gamma-api.polymarket.com/markets?slug=will-trump-deport-250000-500000-people"
```

### Current Prices
```bash
curl -s "https://gamma-api.polymarket.com/markets?slug={slug}" | jq '.[0].outcomePrices | fromjson'
# Returns: ["0.87", "0.13"] -> Yes: 87%, No: 13%
```

### Orderbook
```bash
curl -s "https://clob.polymarket.com/book?token_id={token_id}"
```

### WebSocket (Live Data)
```
wss://ws-subscriptions-clob.polymarket.com/ws/
wss://ws-live-data.polymarket.com
```

## Query Parameters

| Param | Values | Description |
|-------|--------|-------------|
| `limit` | 1-100 | Number of results |
| `active` | true/false | Active markets only |
| `closed` | true/false | Closed markets |
| `sort` | volume, created | Sort order |
| `slug` | string | Market slug |
| `tag` | string | Filter by tag (e.g., "Politics") |

## Output Format

Each market has:
- `question` — Market question
- `slug` — URL-friendly ID
- `volume` — Total volume (USD)
- `liquidity` — Available liquidity
- `outcomePrices` — ["Yes_price", "No_price"]
- `endDate` — Market deadline
- `outcomes` — ["Yes", "No"]

## Examples

### Quick Analysis
```bash
# Get top 5 markets
node scripts/top-markets.mjs

# Analyze specific market
node scripts/market-info.mjs "will-trump-deport-250000-500000-people"

# Price alert check
node scripts/price-check.mjs "trump-deport" 0.80  # Alert if Yes < 0.80
```

## Resources

- [PolymarketScan Agents](https://polymarketscan.org/agents) — Live data for AI
- [prediction-market-analysis](https://github.com/Jon-Becker/prediction-market-analysis) — 36GB dataset
- [Dexter](https://github.com/virattt/dexter) — Autonomous agent
- [Polymarket Python](https://github.com/Polymarket/agents) — Official SDK

## For Trader Agent (Andrzej)

This skill is auto-loaded for `agent:trader`.

Use in system prompt:
```
You have access to Polymarket API.
Use scripts in skills/polymarket/scripts/ to fetch market data.
```

---

*Created: 2026-02-15*
*For: Trader Agent (Andrzej)*