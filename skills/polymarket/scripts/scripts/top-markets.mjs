#!/usr/bin/env node
/**
 * Top Markets by Volume
 * Usage: node top-markets.mjs [limit]
 */

const LIMIT = process.argv[2] || 10;
const API = 'https://gamma-api.polymarket.com';

async function getTopMarkets() {
  const url = `${API}/markets?limit=${LIMIT}&active=true&closed=false&sort=volume`;
  const res = await fetch(url);
  const markets = await res.json();

  console.log(`\n📊 TOP ${LIMIT} POLYMARKET MARKETS BY VOLUME\n`);
  console.log('─'.repeat(80));

  for (let i = 0; i < markets.length; i++) {
    const m = markets[i];
    const prices = JSON.parse(m.outcomePrices);
    const yesPrice = (parseFloat(prices[0]) * 100).toFixed(0);
    const noPrice = (parseFloat(prices[1]) * 100).toFixed(0);
    const volume = Math.round(m.volumeNum).toLocaleString();

    console.log(`\n${i + 1}. ${m.question}`);
    console.log(`   Volume: $${volume} | Yes: ${yesPrice}% | No: ${noPrice}%`);
    console.log(`   Slug: ${m.slug}`);
  }

  console.log('\n' + '─'.repeat(80) + '\n');
}

getTopMarkets().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});