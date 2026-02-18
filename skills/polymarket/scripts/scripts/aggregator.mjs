#!/usr/bin/env node
/**
 * Aggregator — Combine signals into decisions
 * Run: node aggregator.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SIGNALS_PATH = path.join(process.env.HOME, '.openclaw/workspace/memory/trader/signals.json');
const DECISIONS_PATH = path.join(process.env.HOME, '.openclaw/workspace/memory/trader/decisions.json');

// Weights for each signal type
const WEIGHTS = {
  VOLUME_SPIKE: 2,
  WHALE_TERRITORY: 3,
  ODDS_EXTREME: -1,
  ODDS_REVERSAL: 2,
  SENTIMENT_POSITIVE: 1,
  SENTIMENT_NEGATIVE: -1,
  BACKTEST_POSITIVE: 2,
  BACKTEST_NEGATIVE: -2
};

function loadSignals() {
  if (!fs.existsSync(SIGNALS_PATH)) {
    return { signals: [], lastScan: null };
  }
  return JSON.parse(fs.readFileSync(SIGNALS_PATH, 'utf8'));
}

function aggregate(signalsData) {
  const decisions = [];
  
  // Group signals by market
  const byMarket = {};
  for (const signal of signalsData.signals || []) {
    const key = signal.market?.slice(0, 40) || 'unknown';
    if (!byMarket[key]) byMarket[key] = [];
    byMarket[key].push(signal);
  }

  // Calculate score per market
  for (const [market, signals] of Object.entries(byMarket)) {
    let score = 0;
    const reasons = [];

    for (const signal of signals) {
      const weight = WEIGHTS[signal.type] || 0;
      score += weight;
      reasons.push(`${signal.type}(${weight > 0 ? '+' : ''}${weight})`);
    }

    // Decision logic
    let decision = 'HOLD';
    let confidence = 'LOW';
    
    if (score >= 4) {
      decision = 'BUY';
      confidence = score >= 6 ? 'HIGH' : 'MEDIUM';
    } else if (score <= -3) {
      decision = 'AVOID';
      confidence = score <= -5 ? 'HIGH' : 'MEDIUM';
    }

    decisions.push({
      market,
      decision,
      confidence,
      score,
      reasons,
      signalCount: signals.length,
      topSignal: signals[0]
    });
  }

  // Sort by absolute score
  return decisions.sort((a, b) => Math.abs(b.score) - Math.abs(a.score));
}

// Run
const signalsData = loadSignals();

if (!signalsData.signals?.length) {
  console.log('⚠️ No signals found. Run signals.mjs first.');
  process.exit(0);
}

const decisions = aggregate(signalsData);

console.log('📊 AGGREGATOR RESULTS\n');
console.log('='.repeat(50));

decisions.slice(0, 6).forEach(d => {
  const icon = d.decision === 'BUY' ? '✅' : d.decision === 'AVOID' ? '❌' : '⏸️';
  const confIcon = d.confidence === 'HIGH' ? '🟢' : d.confidence === 'MEDIUM' ? '🟡' : '⚪';
  
  console.log(`\n${icon} ${d.decision} ${confIcon} (${d.confidence})`);
  console.log(`   Market: ${d.market}`);
  console.log(`   Score: ${d.score > 0 ? '+' : ''}${d.score}`);
  console.log(`   Signals: ${d.signalCount} | ${d.reasons.slice(0, 3).join(', ')}`);
  if (d.topSignal?.volume) {
    console.log(`   Volume: $${(d.topSignal.volume/1000000).toFixed(1)}M`);
  }
});

// Save
fs.writeFileSync(DECISIONS_PATH, JSON.stringify({
  lastAggregate: new Date().toISOString(),
  sourceSignals: signalsData.lastScan,
  decisions: decisions.slice(0, 10)
}, null, 2));

console.log(`\n✅ Saved ${decisions.length} decisions to memory`);