#!/bin/bash
# QMD setup + cron job

# 1. Dodaj kolekcję pamięci
qmd collection add ~/.openclaw/workspace/memory --name memory --mask "**/*.md"
qmd collection add ~/.openclaw/workspace --name workspace --mask "*.md"

# 2. Zainicjuj indeks
qmd update

# 3. Dodaj cron (4:00 AM Europe/London)
(crontab -l 2>/dev/null; echo "0 4 * * * export OLLAMA_URL=http://localhost:11434; /Users/openyaro/.openclaw/workspace/skills/qmd/bin/qmd update") | crontab -

echo "QMD configured. Cron: daily at 4:00 AM"