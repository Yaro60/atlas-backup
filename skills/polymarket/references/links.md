# Polymarket Resources

## Official

- [Polymarket](https://polymarket.com) — Main platform
- [Polymarket Python Agent](https://github.com/Polymarket/agents) — Official SDK
- [Gamma API Docs](https://docs.polymarket.com/) — API documentation

## Third-Party Tools

- [PolymarketScan](https://polymarketscan.org) — Market analytics
- [PolymarketScan Agents](https://polymarketscan.org/agents) — Agent API
- [prediction-market-analysis](https://github.com/Jon-Becker/prediction-market-analysis) — 36GB dataset by Jon Becker
- [Dexter](https://github.com/virattt/dexter) — Autonomous financial research agent

## Research Papers

- Prediction Markets: A Survey
- Information Aggregation in Prediction Markets
- AI Agents in Financial Markets

## API Quick Reference

### Gamma API (Markets)

```
GET /markets
  ?limit=10
  &active=true
  &closed=false
  &sort=volume
  &slug={slug}
  &tag={tag}

GET /markets/{id}

GET /events
  ?active=true
  &tag=Politics
```

### CLOB API (Trading)

```
GET /book?token_id={id}
GET /prices
GET /orderbook/{market}
POST /order (requires auth)
```

### WebSocket

```
wss://ws-subscriptions-clob.polymarket.com/ws/
wss://ws-live-data.polymarket.com
```

## Common Tags

- `Politics`
- `Crypto`
- `Sports`
- `Entertainment`
- `Science`
- `Tech`

---

*Collected: 2026-02-15*