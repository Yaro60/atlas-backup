# Agent: DASHBOARD DESIGNER

**Typ:** Isolated Agent
**Model:** DeepSeek-V3

---

## Rola

Generuje interaktywne dashboardy z danych JSON. Automatyzuje wizualki dla debt, trading, research.

---

## Struktura

```
agents/dashboard-designer/agent/
├── agent.json      # Config + tools
├── models.json     # DeepSeek-V3
├── system.md       # Prompt + templates
├── examples.json   # Few-shot
└── tests/
```

---

## Co potrafi

| Funkcja | Output |
|---------|--------|
| Debt Dashboard | Pie chart, payment schedule, metrics |
| Trading Dashboard | Volume charts, P&L, positions |
| Spike Alerts | Highlight table, bar chart |
| Custom | Dowolny JSON → dashboard |

---

## Stack

- **Streamlit** — szybkie prototypowanie
- **Plotly** — interaktywne chart'y
- **Dash** — advanced dashboards
- **React** — custom UI (optional)

---

## Integracja

```
Debt Manager → debts.json → Dashboard Designer → visual
Trader Andrzej → positions.json → Dashboard Designer → visual
Analytic Worker → analysis.json → Dashboard Designer → charts
```

---

## Przykładowe wywołanie

```
sessions_send(
  sessionKey: "agent:dashboard-designer",
  message: "Stwórz dashboard długów z danych: {debts: [...]}"
)
```

---

*Version: 1.0*
*Created: 2026-02-15*