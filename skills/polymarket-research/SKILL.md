# Polymarket Research Skill

Use when: monitoring markets, analyzing predictions, fetching live data.

## Quick API Reference

### REST APIs
| API | URL | Purpose |
|-----|-----|---------|
| Gamma | `https://gamma-api.polymarket.com` | Market discovery, metadata |
| CLOB | `https://clob.polymarket.com` | Orders, prices, orderbooks |
| Data | `https://data-api.polymarket.com` | Positions, history |

### WebSocket
- `wss://ws-subscriptions-clob.polymarket.com/ws/` — orderbook updates
- `wss://ws-live-data.polymarket.com` — live prices

### Quick Commands

**Top markets by volume:**
```bash
curl -s "https://gamma-api.polymarket.com/markets?limit=10&active=true&closed=false"
```

**Parse to readable:**
```bash
curl -s "https://gamma-api.polymarket.com/markets?limit=20&active=true&closed=false" | python3 -c "
import sys,json
data=json.load(sys.stdin)
for m in sorted(data, key=lambda x: float(x.get('volume',0) or 0), reverse=True)[:10]:
    vol = float(m.get('volume',0) or 0)
    price = m.get('outcomePrices','[]').replace('[\"','').split('\"')[0]
    print(f'\${vol:,.0f} | Yes: {price} | {m[\"question\"][:50]}')"
```

## Resources

### Historical Data
- **prediction-market-analysis** (Jon Becker)
- Repo: https://github.com/Jon-Becker/prediction-market-analysis
- 36GB dataset, Python framework
- `make setup` → `make analyze`

### Agent Frameworks
- **Polymarket Agents** (Official): https://github.com/Polymarket/agents
- **Dexter** (virattt): https://github.com/virattt/dexter
- **PolymarketScan API**: https://polymarketscan.org/agents

## Alert Conditions

When heartbeat checks Polymarket, alert if:
- Volume spike > 50% in 24h
- Odds reversal (0.2 → 0.8)
- New market related to user's edge (Polish politics, crypto)