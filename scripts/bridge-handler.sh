#!/bin/bash
# Bridge Handler — procesuje wiadomości z Claude App

MESSAGE="$1"
DATE=$(date '+%Y-%m-%d')
TIME=$(date '+%H:%M:%S')

# Parsuj TAG
TAG=$(echo "$MESSAGE" | head -1 | grep -oE '^(INSIGHT|PROMPT|QUESTION):')
CONTENT=$(echo "$MESSAGE" | sed 's/^(INSIGHT|PROMPT|QUESTION):[[:space:]]*//')

if [ -z "$TAG" ]; then
    echo "⚠️ Brak tagu. Użyj: INSIGHT, PROMPT, lub QUESTION"
    exit 1
fi

case "$TAG" in
    "INSIGHT:")
        # Zapisz do insights
        mkdir -p ~/.openclaw/workspace/memory/insights
        FILE="~/.openclaw/workspace/memory/insights/${DATE}.md"
        
        echo "" >> "$FILE"
        echo "## $TIME" >> "$FILE"
        echo "$CONTENT" >> "$FILE"
        
        # Sprawdź czy ma "actionable" keywords
        if echo "$CONTENT" | grep -qiE '(zróbmy|zrobić|task|action|wykonaj|sprawdź)'; then
            echo "💡 Insight zapisany. Wykryto actionable content."
            # Tu mógłby być auto-task creation
        else
            echo "✅ Insight zapisany."
        fi
        ;;
        
    "PROMPT:")
        echo "▶️ Wykonuję PROMPT..."
        # Zapisz do queue
        mkdir -p ~/.openclaw/workspace/queue
        echo "$CONTENT" > "~/.openclaw/workspace/queue/prompt_${DATE}_${TIME}.txt"
        echo "✅ Prompt przekazany do wykonania."
        ;;
        
    "QUESTION:")
        echo "🔍 Analizuję QUESTION..."
        # Log question
        mkdir -p ~/.openclaw/workspace/memory/questions
        echo "$DATE $TIME: $CONTENT" >> "~/.openclaw/workspace/memory/questions/log.md"
        echo "✅ Pytanie zalogowane. Odpowiem po analizie danych."
        ;;
        
    *)
        echo "❓ Nieznany tag: $TAG"
        exit 1
        ;;
esac