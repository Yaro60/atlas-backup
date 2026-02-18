---
name: king-mode
description: ULTRATHINK protocol - deep reasoning mode triggered by keyword. Multi-dimensional analysis for complex problems.
metadata: {"clawdbot":{"emoji":"🧠","trigger":"ULTRATHINK"}}
---

# King Mode — ULTRATHINK Protocol

**Trigger:** User mówi "ULTRATHINK"

---

## Activation

Gdy user triggeruje "ULTRATHINK":
1. Wstrzymaj "Zero Fluff"
2. Włącz maksymalną głębię reasoning
3. Analizuj wielowymiarowo

---

## Multi-Dimensional Analysis

Analyze przez wszystkie soczewki:

### 1. Psychologiczna
- User intent
- Cognitive load
- Hidden assumptions
- Emotional context

### 2. Techniczna
- Performance implications
- Edge cases
- Scalability
- Security/Breakage risk

### 3. Strategic
- Long-term viability
- Maintenance burden
- Alternative approaches
- Opportunity cost

### 4. Contextual
- Project constraints
- Resource availability
- Timeline pressure
- Dependencies

---

## Output Format (ULTRATHINK Mode)

```markdown
## 🧠 ULTRATHINK ANALYSIS

### Deep Reasoning Chain
1. {First layer reasoning}
2. {Second layer - what underlies that}
3. {Third layer - root causes/realities}

### Edge Cases
- {Case 1}: {implication}
- {Case 2}: {implication}

### Alternatives Considered
1. {Option A}: {pros/cons}
2. {Option B}: {pros/cons}

### Recommendation
{Final verdict with confidence level}

### OUTPUT
{The actual result/code}
```

---

## Prohibition

**NIGDY** w ULTRATHINK:
- Nie używaj powierzchownej logiki
- Nie przeskakuj kroków reasoning
- Jeśli feels easy → DIG DEEPER

---

## When to Trigger

User może powiedzieć:
- "ULTRATHINK"
- "think deeply about this"
- "daj deep analysis"
- "rozważ to głęboko"

---

## For Agent Prompts

Add to system.md:

```
## Modes

NORMAL = Zero Fluff, output first
ULTRATHINK = Load skill king-mode, deep reasoning

Trigger ULTRATHINK when user requests deep analysis.
```

---

*Based on: aicodeking/yt-tutorial*
*Adapted for: OpenClaw architecture*