#!/usr/bin/env node
/**
 * Search Markets
 * Usage: node search.mjs <query> [limit]
 */

const QUERY = process.argv[2];
const LIMIT = process.argv[3] || 5;
const API = 'https://gamma-api.polymarket.com';

if (!QUERY) {
  console.log('Usage: node search.mjs <query> [limit]');
  console.log('Example: node search.mjs trump 10');
  process.exit(1);
}

async function searchMarkets() {
  const url = `${API}/markets?limit=50&active=true&closed=false`;
  const res = await fetch(url);
  const markets = await res.json();

  // Filter by query
  const filtered = markets.filter(m =>
    m.question.toLowerCase().includes(QUERY.toLowerCase())
  ).slice(0, LIMIT);

  console.log(`\n🔍 SEARCH: "${QUERY}" (${filtered.length} results)\n`);
  console.log('─'.repeat(70));

  for (let i = 0; i < filtered.length; i++) {
    const m = filtered[i];
    const prices = JSON.parse(m.outcomePrices);
    const yesPrice = (parseFloat(prices[0]) * 100).toFixed(0);
    const volume = Math.round(m.volumeNum).toLocaleString();

    console.log(`\n${i + 1}. ${m.question}`);
    console.log(`   Yes: ${yesPrice}% | Volume: $${volume}`);
    console.log(`   Slug: ${m.slug}`);
  }

  console.log('\n' + '─'.repeat(70) + '\n');

  return filtered;
}

searchMarkets().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});