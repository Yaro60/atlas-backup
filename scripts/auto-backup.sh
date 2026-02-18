#!/bin/bash
# Auto-backup do git co 6h

cd ~/.openclaw/workspace || exit 1

# Sprawdź czy to repo git
if [ ! -d .git ]; then
    echo "Not a git repo"
    exit 1
fi

# Dodaj zmiany
git add -A

# Commit jeśli są zmiany
if ! git diff --cached --quiet; then
    git commit -m "Auto-backup: $(date '+%Y-%m-%d %H:%M')"
    git push origin main 2>/dev/null || git push origin master 2>/dev/null
    echo "Backed up at $(date)"
else
    echo "No changes to backup"
fi