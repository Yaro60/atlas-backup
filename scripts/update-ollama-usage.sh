#!/bin/bash
# update-ollama-usage.sh
# Run this to update Ollama Cloud usage in memory

echo "☁️ Ollama Cloud Usage Update"
echo "============================"
echo ""
echo "1. Open: https://ollama.com/settings (log in if needed)"
echo "2. Check your Session Usage and Weekly Usage"
echo ""
echo "Enter your current usage values:"
echo ""

read -p "Session Usage % (e.g. 22.5): " session
read -p "Weekly Usage % (e.g. 17.9): " weekly

# Save to memory
cat > ~/.openclaw/workspace/memory/ollama-usage.json << EOF
{
  "sessionUsage": $session,
  "weeklyUsage": $weekly,
  "lastUpdated": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "sessionReset": "1 hour",
  "weeklyReset": "11 hours"
}
EOF

echo ""
echo "✅ Saved to memory/ollama-usage.json"
echo ""
echo "Dashboard will now show:"
echo "  Session: ${session}%"
echo "  Weekly: ${weekly}%"
echo ""
echo "Tip: Add to crontab for reminder:"
echo "  0 * * * * ~/.openclaw/workspace/scripts/update-ollama-usage.sh"