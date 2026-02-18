#!/usr/bin/env node
/**
 * Volume Spike Detection
 * Usage: node volume-spike.mjs [threshold_percent]
 *
 * Find markets with unusual volume activity (24h vs total)
 */

const THRESHOLD = parseFloat(process.argv[2]) || 10; // 10% default
const API = 'https://gamma-api.polymarket.com';

async function detectVolumeSpikes() {
  const url = `${API}/markets?limit=100&active=true&closed=false&sort=volume`;
  const res = await fetch(url);
  const markets = await res.json();

  console.log(`\n📊 VOLUME SPIKE DETECTION (threshold: ${THRESHOLD}%)\n`);
  console.log('─'.repeat(70));

  const spikes = [];

  for (const m of markets) {
    const volume24h = m.volume24hr || 0;
    const totalVolume = m.volumeNum || 0;

    if (totalVolume > 10000) { // Min $10k volume
      const spikePercent = (volume24h / totalVolume) * 100;

      if (spikePercent >= THRESHOLD) {
        spikes.push({
          question: m.question,
          slug: m.slug,
          volume24h: volume24h,
          totalVolume: totalVolume,
          spikePercent: spikePercent
        });
      }
    }
  }

  // Sort by spike percent
  spikes.sort((a, b) => b.spikePercent - a.spikePercent);

  if (spikes.length === 0) {
    console.log(`\n✅ No volume spikes detected above ${THRESHOLD}%\n`);
    return [];
  }

  console.log(`\n🚨 ${spikes.length} VOLUME SPIKES DETECTED:\n`);

  for (let i = 0; i < Math.min(spikes.length, 10); i++) {
    const s = spikes[i];
    console.log(`${i + 1}. ${s.question.substring(0, 50)}...`);
    console.log(`   24h: $${Math.round(s.volume24h).toLocaleString()} (${s.spikePercent.toFixed(1)}% of total)`);
    console.log(`   Total: $${Math.round(s.totalVolume).toLocaleString()}`);
    console.log('');
  }

  console.log('─'.repeat(70) + '\n');

  return spikes;
}

detectVolumeSpikes().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});