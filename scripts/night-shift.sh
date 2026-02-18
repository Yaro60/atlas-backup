#!/bin/bash
# Night Shift — Szukacz szuka okazji zarobkowych 00:00-06:00

DATE=$(date '+%Y-%m-%d')
LOG_DIR="$HOME/.openclaw/workspace/memory/night-shift"
LOG_FILE="$LOG_DIR/${DATE}.md"

mkdir -p "$LOG_DIR"

# Kopia template
cp "$LOG_DIR/TEMPLATE.md" "$LOG_FILE"
sed -i '' "s/YYYY-MM-DD/$DATE/g" "$LOG_FILE"

# Funkcja logowania
log_section() {
    echo "" >> "$LOG_FILE"
    echo "### $(date '+%H:%M') — $1" >> "$LOG_FILE"
    echo "$2" >> "$LOG_FILE"
}

# Wypełnij datę
sed -i '' "s/^- Date: $/- Date: $DATE/" "$LOG_FILE"

log_section "Rozpoczęcie" "Szukacz uruchomiony. Eksploracja rozpoczęta."

# Tu będą komendy exa-web-search-free
# mcporter call 'exa.web_search_exa' ...

log_section "Status" "Szukanie w toku. Rano podsumowanie."

echo "Night shift started: $DATE"