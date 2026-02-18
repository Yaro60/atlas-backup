#!/usr/bin/env node
/**
 * Signal Scanner — Real-time market signals
 * Run: node signals.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GAMMA_API = 'https://gamma-api.polymarket.com';
const MEM_PATH = path.join(process.env.HOME, '.openclaw/workspace/memory/trader/signals.json');

async function fetchTopMarkets(limit = 50) {
  const url = `${GAMMA_API}/markets?limit=${limit}&active=true&closed=false`;
  const res = await fetch(url);
  return res.json();
}

async function scanSignals() {
  console.log('🔍 Scanning for signals...\n');
  
  const markets = await fetchTopMarkets(50);
  const signals = [];

  for (const market of markets) {
    const volume = parseFloat(market.volume || 0);
    const yesPrice = parseFloat(market.outcomePrices?.[0] || 0);
    
    // Volume spike detection (>$1M)
    if (volume > 1000000) {
      signals.push({
        type: 'VOLUME_SPIKE',
        market: market.question?.slice(0, 60),
        volume: volume,
        yesPrice: yesPrice,
        severity: volume > 5000000 ? 'HIGH' : 'MEDIUM',
        timestamp: new Date().toISOString()
      });
    }

    // Odds extremes (>95% or <5%)
    if (yesPrice > 0.95 || yesPrice < 0.05) {
      signals.push({
        type: 'ODDS_EXTREME',
        market: market.question?.slice(0, 60),
        yesPrice: yesPrice,
        severity: 'MEDIUM',
        timestamp: new Date().toISOString()
      });
    }

    // Whale territory (>$5M volume)
    if (volume > 5000000) {
      signals.push({
        type: 'WHALE_TERRITORY',
        market: market.question?.slice(0, 60),
        volume: volume,
        severity: 'HIGH',
        timestamp: new Date().toISOString()
      });
    }
  }

  // Sort by severity then volume
  return signals.sort((a, b) => {
    const order = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    if (order[a.severity] !== order[b.severity]) {
      return order[a.severity] - order[b.severity];
    }
    return (b.volume || 0) - (a.volume || 0);
  });
}

// Run
scanSignals().then(signals => {
  console.log(`📊 Found ${signals.length} signals:\n`);
  
  signals.slice(0, 10).forEach(s => {
    const icon = s.severity === 'HIGH' ? '🚨' : '⚠️';
    console.log(`${icon} [${s.type}] ${s.market}`);
    if (s.volume) console.log(`   Volume: $${(s.volume/1000000).toFixed(1)}M`);
    if (s.yesPrice) console.log(`   Yes: ${(s.yesPrice * 100).toFixed(0)}%`);
    console.log('');
  });

  // Ensure dir exists
  const dir = path.dirname(MEM_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Save
  fs.writeFileSync(MEM_PATH, JSON.stringify({
    lastScan: new Date().toISOString(),
    totalSignals: signals.length,
    signals: signals.slice(0, 20)
  }, null, 2));
  
  console.log(`✅ Saved ${signals.length} signals to memory`);
});