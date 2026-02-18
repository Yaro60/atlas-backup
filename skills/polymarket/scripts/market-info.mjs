#!/usr/bin/env node
/**
 * Market Info
 * Usage: node market-info.mjs <slug>
 */

const SLUG = process.argv[2];
const API = 'https://gamma-api.polymarket.com';

if (!SLUG) {
  console.log('Usage: node market-info.mjs <slug>');
  console.log('Example: node market-info.mjs will-trump-deport-250000-500000-people');
  process.exit(1);
}

async function getMarketInfo() {
  const url = `${API}/markets?slug=${SLUG}`;
  const res = await fetch(url);
  const [market] = await res.json();

  if (!market) {
    console.log(`❌ Market not found: ${SLUG}`);
    process.exit(1);
  }

  const prices = JSON.parse(market.outcomePrices);
  const outcomes = JSON.parse(market.outcomes);

  console.log(`\n📊 MARKET DETAILS\n`);
  console.log('─'.repeat(60));
  console.log(`\n📌 ${market.question}\n`);
  console.log('─'.repeat(60));
  console.log(`\n💰 Financials:`);
  console.log(`   Volume:     $${Math.round(market.volumeNum).toLocaleString()}`);
  console.log(`   Liquidity:  $${Math.round(market.liquidityNum).toLocaleString()}`);
  console.log(`   24h Volume: $${Math.round(market.volume24hr || 0).toLocaleString()}`);

  console.log(`\n📈 Prices:`);
  console.log(`   ${outcomes[0]}: ${(parseFloat(prices[0]) * 100).toFixed(1)}%`);
  console.log(`   ${outcomes[1]}: ${(parseFloat(prices[1]) * 100).toFixed(1)}%`);

  console.log(`\n📅 Dates:`);
  console.log(`   Start: ${market.startDateIso}`);
  console.log(`   End:   ${market.endDateIso}`);

  console.log(`\n🔗 Links:`);
  console.log(`   Polymarket: https://polymarket.com/event/${market.events?.[0]?.slug || market.slug}`);
  console.log(`   API: ${API}/markets?slug=${SLUG}`);

  console.log(`\n📝 Description:`);
  console.log(`   ${market.description?.substring(0, 200)}...`);

  console.log('\n' + '─'.repeat(60) + '\n');

  // Return for scripting
  return {
    question: market.question,
    volume: market.volumeNum,
    prices: { yes: prices[0], no: prices[1] },
    slug: market.slug
  };
}

getMarketInfo().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});