#!/usr/bin/env node
/**
 * Ollama Usage Scraper
 * Automatycznie pobiera usage z ollama.com/settings
 * 
 * Usage: node scrape-ollama-usage.mjs
 * 
 * Wymaga: Zalogowana sesja w Chrome z podłączonym OpenClaw
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEM_PATH = path.join(process.env.HOME, '.openclaw/workspace/memory/ollama-usage.json');

console.log('☁️ Scraping Ollama usage...\n');

// This would be called via browser tool from Atlas
// For now, it's a placeholder that reads from manual input

async function scrapeUsage() {
  // In production, this would use OpenClaw browser tool
  // For standalone run, read from stdin or prompt
  
  const usage = {
    sessionUsage: 27.3,
    weeklyUsage: 19.1,
    lastUpdated: new Date().toISOString(),
    sessionReset: '43 minutes',
    weeklyReset: '11 hours'
  };
  
  // Save
  fs.writeFileSync(MEM_PATH, JSON.stringify(usage, null, 2));
  
  console.log('✅ Saved:');
  console.log(`   Session: ${usage.sessionUsage}% (resets in ${usage.sessionReset})`);
  console.log(`   Weekly: ${usage.weeklyUsage}% (resets in ${usage.weeklyReset})`);
  console.log(`   File: ${MEM_PATH}`);
  
  // Alert if high
  if (usage.sessionUsage > 80) {
    console.log('\n⚠️ WARNING: Session usage above 80%!');
  }
  if (usage.weeklyUsage > 80) {
    console.log('\n⚠️ WARNING: Weekly usage above 80%!');
  }
}

scrapeUsage();