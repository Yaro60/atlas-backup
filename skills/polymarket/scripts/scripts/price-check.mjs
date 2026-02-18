#!/usr/bin/env node
/**
 * Price Check with Alert
 * Usage: node price-check.mjs <search> [threshold]
 *
 * Check if Yes price is below threshold (alert opportunity)
 */

const SEARCH = process.argv[2];
const THRESHOLD = parseFloat(process.argv[3]) || 0.5;
const API = 'https://gamma-api.polymarket.com';

if (!SEARCH) {
  console.log('Usage: node price-check.mjs <search> [threshold]');
  console.log('Example: node price-check.mjs deport 0.80');
  process.exit(1);
}

async function checkPrice() {
  // Search for market
  const searchUrl = `${API}/markets?limit=10&active=true&closed=false`;
  const res = await fetch(searchUrl);
  const markets = await res.json();

  // Filter by search term
  const filtered = markets.filter(m =>
    m.question.toLowerCase().includes(SEARCH.toLowerCase())
  );

  if (filtered.length === 0) {
    console.log(`❌ No markets found for: "${SEARCH}"`);
    process.exit(1);
  }

  console.log(`\n📊 PRICE CHECK: "${SEARCH}" (threshold: ${THRESHOLD * 100}%)\n`);
  console.log('─'.repeat(70));

  let alerts = [];

  for (const m of filtered) {
    const prices = JSON.parse(m.outcomePrices);
    const yesPrice = parseFloat(prices[0]);
    const volume = Math.round(m.volumeNum).toLocaleString();

    const alert = yesPrice < THRESHOLD;
    const icon = alert ? '🚨' : '✅';
    const status = alert ? 'BELOW THRESHOLD' : 'OK';

    console.log(`\n${icon} ${m.question.substring(0, 50)}...`);
    console.log(`   Yes: ${(yesPrice * 100).toFixed(1)}% | Volume: $${volume} | ${status}`);

    if (alert) {
      alerts.push({
        question: m.question,
        yesPrice: yesPrice,
        threshold: THRESHOLD,
        slug: m.slug
      });
    }
  }

  console.log('\n' + '─'.repeat(70));

  if (alerts.length > 0) {
    console.log(`\n🚨 ALERTS: ${alerts.length} markets below ${THRESHOLD * 100}%\n`);
    for (const a of alerts) {
      console.log(`   • ${a.question.substring(0, 40)}... @ ${(a.yesPrice * 100).toFixed(1)}%`);
    }
    console.log('');
  } else {
    console.log(`\n✅ All markets above ${THRESHOLD * 100}% threshold\n`);
  }

  return alerts;
}

checkPrice().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});