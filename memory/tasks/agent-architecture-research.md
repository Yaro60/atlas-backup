# Agent Architecture Research

**Research Date:** 2026-02-15  
**Topic:** Optimal Agent/Sub-Agent Architecture for Trading/Research Systems

---

## Sources

### Primary Documentation & Frameworks
1. **Anthropic Engineering** - ["Building Effective AI Agents"](https://www.anthropic.com/engineering/building-effective-agents) - Definitive guide on agent patterns
2. **Anthropic Engineering** - ["The 'think' tool"](https://www.anthropic.com/engineering/claude-think-tool) - Best practices for complex reasoning
3. **Lilian Weng's Blog** - ["LLM Powered Autonomous Agents"](https://lilianweng.github.io/posts/2023-06-23-agent/) - Foundational agent architecture
4. **OpenAI Platform** - ["Agents Documentation"](https://developers.openai.com/api/docs/guides/agents) - AgentKit and orchestration
5. **OpenAI Cookbook** - ["Orchestrating Agents: Routines and Handoffs"](https://cookbook.openai.com/examples/orchestrating_agents) - Swarm architecture

### Framework Documentation
6. **LangChain** - Multi-agent and agent building documentation
7. **AutoGen (Microsoft)** - Multi-agent framework for research and production
8. **CrewAI** - Role-based multi-agent orchestration
9. **smolagents (HuggingFace)** - Lightweight agent framework

### Community Discussions
10. **Reddit r/LocalLLaMA** - Multiple threads on framework comparisons and production experiences

---

## Key Findings

### 1. Specialized vs. General Agents

**CONSENSUS: Specialized agents outperform general agents for complex tasks**

From Anthropic's research with dozens of teams:
> "The most successful implementations weren't using complex frameworks or specialized libraries. Instead, they were building with simple, composable patterns."

**Key Insight:** Specialization matters, but the architecture pattern matters more than the number of agents.

| Approach | Best For | Trade-offs |
|----------|----------|------------|
| **Single General Agent** | Simple, narrow tasks | Low complexity, but struggles with multi-domain tasks |
| **Few Specialized Agents** | Most production systems | Good balance of capability and maintainability |
| **Many Specialized Agents** | Complex workflows | Higher capability but more coordination complexity |

### 2. Optimal Hierarchy Patterns

**Five Core Patterns Identified by Anthropic:**

#### Pattern 1: Prompt Chaining
```
User Input → Step 1 → Step 2 → Step 3 → Output
```
- **Use when:** Task decomposes into fixed, sequential subtasks
- **Example:** Research → Analysis → Report Generation

#### Pattern 2: Routing
```
User Input → Classifier → Route to Specialist A/B/C
```
- **Use when:** Different input types need different handling
- **Example:** Route trading vs. research queries to different specialists

#### Pattern 3: Parallelization
```
        ┌→ Agent A →┐
User → Orchestrator   ├──→ Aggregator → Output
        └→ Agent B →┘
```
- **Use when:** Subtasks can run independently
- **Example:** Multiple market analyses in parallel

#### Pattern 4: Orchestrator-Workers
```
User → Orchestrator → [delegates to workers dynamically]
                         ↓
                    Synthesizes Results → Output
```
- **Use when:** Subtasks are unpredictable
- **Best for:** Trading systems with dynamic research needs

#### Pattern 5: Evaluator-Optimizer
```
Generator → Response → Evaluator → Feedback → Loop
```
- **Use when:** Clear evaluation criteria exist
- **Best for:** Analysis quality control in trading

---

## Recommended Architecture for Trading/Research Systems

Based on the research, here's the optimal architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR AGENT                        │
│  (Main Coordinator - Claude Sonnet 4.5 / GPT-4o)             │
│  - Receives user requests                                     │
│  - Plans task decomposition                                   │
│  - Routes to appropriate specialists                         │
│  - Synthesizes final results                                  │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ↓                     ↓                     ↓
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ RESEARCH      │     │ ANALYST       │     │ TRADER        │
│ AGENT         │     │ AGENT         │     │ AGENT         │
│               │     │               │     │               │
│ Tools:        │     │ Tools:        │     │ Tools:        │
│ - Web search  │     │ - Data        │     │ - Order       │
│ - Document    │     │   analysis    │     │   execution   │
│   retrieval   │     │ - Chart       │     │ - Position    │
│ - News APIs   │     │   generation  │     │   management  │
│ - SEC filings │     │ - Risk models │     │ - Risk checks │
│               │     │               │     │               │
│ Model: Fast   │     │ Model: Reason │     │ Model: Precise│
│ (Haiku/Mini)  │     │ (Sonnet/GPT-4)│     │ (Sonnet/GPT-4)│
└───────────────┘     └───────────────┘     └───────────────┘
        │                     │                     │
        └─────────────────────┴─────────────────────┘
                              │
                              ↓
                    ┌───────────────┐
                    │ EVALUATOR     │
                    │ AGENT         │
                    │               │
                    │ - Quality     │
                    │   checks      │
                    │ - Validation  │
                    │ - Safety      │
                    │   guardrails  │
                    └───────────────┘
```

---

## Pro Tips from Production Builders

### From Anthropic's Customer Research:

1. **Start Simple, Add Complexity Only When Needed**
   > "Success in the LLM space isn't about building the most sophisticated system. It's about building the right system for your needs."

2. **Use Frameworks Wisely**
   > "Frameworks can help you get started quickly, but don't hesitate to reduce abstraction layers and build with basic components as you move to production."

3. **Invest in Tool Design**
   > "We actually spent more time optimizing our tools than the overall prompt."

4. **The "Think" Tool Pattern**
   - Add a dedicated "think" tool for complex reasoning
   - Especially useful for policy-heavy environments
   - 54% improvement on complex tasks (τ-Bench results)
   - Best when: sequential decisions, policy compliance, complex tool chains

### From OpenAI's Swarm Architecture:

5. **Use Handoff Functions**
   - `transfer_to_XXX()` functions for agent transitions
   - Agents can naturally select when to hand off
   - Complete conversation context preserved

6. **Define Clear Routines**
   - Each agent should have a clear "routine" (steps + tools)
   - System prompts document the expected workflow

### From CrewAI Best Practices:

7. **Role-Goal-Backstory Pattern**
   - Each agent needs: `role` (function), `goal` (objective), `backstory` (context)
   - This gives personality without over-specification

8. **Enable Reasoning for Strategic Tasks**
   - Set `reasoning=True` for planning/reflection before execution
   - Use `max_reasoning_attempts` to limit planning iterations

9. **Use Different Models for Different Roles**
   - Fast models (Haiku/GPT-4o-mini) for simple routing
   - Capable models (Sonnet/GPT-4) for complex analysis
   - Consider `function_calling_llm` separate from main LLM

---

## Models Recommended for Different Roles

| Role | Recommended Model | Why |
|------|-------------------|-----|
| **Orchestrator** | Claude Sonnet 4.5 / GPT-4o | Needs strong planning and coordination |
| **Research Agent** | Claude Haiku 4.5 / GPT-4o-mini | Fast, cost-effective for parallel queries |
| **Analyst Agent** | Claude Sonnet 4.5 / GPT-4 | Extended thinking for complex analysis |
| **Trader Agent** | Claude Sonnet 4.5 / GPT-4 | Precision, reasoning, tool use quality |
| **Evaluator Agent** | Claude Sonnet 4.5 / GPT-4o-mini | Can use cheaper model for validation |
| **Tool Calling** | GPT-4o-mini / Haiku | Dedicated function calling LLM saves cost |

### Key Model Selection Principles:

1. **Match complexity to capability** - Don't waste GPT-4 on simple classification
2. **Use extended thinking wisely** - Claude's extended thinking for complex reasoning
3. **Consider cost per task** - Many small agents > few expensive calls
4. **Test in sandbox** - Production behavior differs from testing

---

## Framework Recommendations

### For Trading/Research Systems:

| Framework | Best For | Notes |
|-----------|----------|-------|
| **LangGraph** | Complex, stateful workflows | Most flexible, production-ready |
| **CrewAI** | Role-based teams | Easy to start, good for research teams |
| **AutoGen** | Research/Multi-agent collaboration | Strong for iterative discussions |
| **Smolagents** | Code-heavy agents | Best when Python execution needed |
| **Claude Agent SDK** | Claude-native systems | Tightest Claude integration |

### Anthropic's Framework Guidance:
> "We suggest that developers start by using LLM APIs directly: many patterns can be implemented in a few lines of code. If you do use a framework, ensure you understand the underlying code."

---

## Critical Challenges to Address

### 1. Context Window Limitations
- Use `respect_context_window=True` with summarization
- Consider RAG tools for large data
- Break tasks into smaller chunks

### 2. Reliability in Natural Language Interface
- Models may format incorrectly
- Implement robust parsing
- Use structured outputs (Pydantic)

### 3. Long-term Planning
- LLMs struggle with multi-step adjustments
- Implement evaluator-optimizer loops
- Add human-in-the-loop checkpoints

### 4. Cost Management
- Use cheaper models for routing/simple tasks
- Implement caching for repeated queries
- Monitor token usage per agent

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Define clear agent roles and boundaries
- [ ] Start with orchestrator-workers pattern
- [ ] Implement basic routing logic
- [ ] Add core tools for each specialist

### Phase 2: Enhancement
- [ ] Add evaluator-optimizer loop
- [ ] Implement "think" tool for complex reasoning
- [ ] Add handoff functions between agents
- [ ] Set up monitoring (Langfuse/LangSmith)

### Phase 3: Production
- [ ] Implement robust error handling
- [ ] Add guardrails and safety checks
- [ ] Optimize model selection per task
- [ ] Set up evaluation pipeline

---

## Summary: Key Architectural Decisions

1. **Specialized agents over general agents** - But keep the number manageable (3-5 specialists)

2. **Orchestrator-Workers as default pattern** - Most flexible for trading/research

3. **Start with direct API calls** - Only add frameworks when complexity demands it

4. **Invest heavily in tool design** - More impact than prompt engineering

5. **Use the "think" tool** - Significant improvement for complex tasks

6. **Match model to task complexity** - Don't over-provision or under-provision

7. **Add evaluator loops** - Critical for trading where errors are costly

8. **Implement handoffs with context preservation** - Agents should know conversation history

---

## References

- Weng, Lilian. (Jun 2023). "LLM-powered Autonomous Agents". Lil'Log.
- Schluntz, E. & Zhang, B. (Anthropic). "Building Effective AI Agents".
- OpenAI. "Orchestrating Agents: Routines and Handoffs" (Cookbook).
- τ-Bench Research Paper (arXiv:2406.12045)
- CrewAI Documentation - Agents Configuration
- AutoGen Documentation - Microsoft Research