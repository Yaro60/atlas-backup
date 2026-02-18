// Mock data for Mission Control Dashboard

export const activityData = [
  { id: 1, type: 'file', action: 'Created', target: 'trader.md', time: '10:30 AM' },
  { id: 2, type: 'command', action: 'Ran', target: 'top-markets.mjs', time: '10:25 AM' },
  { id: 3, type: 'message', action: 'Sent', target: 'debt-manager agent', time: '10:20 AM' },
  { id: 4, type: 'task', action: 'Completed', target: 'Architecture design', time: '10:15 AM' },
  { id: 5, type: 'file', action: 'Updated', target: 'MEMORY.md', time: '10:10 AM' },
  { id: 6, type: 'command', action: 'Ran', target: 'volume-spike.mjs', time: '10:05 AM' },
  { id: 7, type: 'agent', action: 'Spawned', target: 'Dashboard Designer', time: '10:00 AM' },
]

export const calendarData = {
  week: [
    { day: 'Mon', events: [] },
    { day: 'Tue', events: [{ name: 'Heartbeat', time: '08:00' }] },
    { day: 'Wed', events: [] },
    { day: 'Thu', events: [
      { name: 'Heartbeat', time: '08:00' },
      { name: 'Morning Brief', time: '07:00' }
    ]},
    { day: 'Fri', events: [{ name: 'Heartbeat', time: '08:00' }] },
    { day: 'Sat', events: [] },
    { day: 'Sun', events: [] },
  ]
}

export const usageData = {
  tokensIn: 431000,
  tokensOut: 2100,
  contextUsed: 92000,
  contextTotal: 200000,
  compactions: 3,
  sessionTime: '1h 15m',
  model: 'GLM-5:cloud',
  runtime: 'direct'
}

export const agentsData = {
  atlas: {
    name: 'Atlas',
    role: 'Orchestrator',
    model: 'GLM-5',
    context: '200K',
    status: 'active'
  },
  trader: {
    name: 'Andrzej',
    role: 'Trader',
    model: 'DeepSeek-V3',
    context: '131K',
    status: 'ready'
  },
  debtManager: {
    name: 'Debt Manager',
    role: 'Financial',
    model: 'DeepSeek-V3',
    context: '131K',
    status: 'ready'
  },
  dashboardDesigner: {
    name: 'Dashboard Designer',
    role: 'UI',
    model: 'DeepSeek-V3',
    context: '131K',
    status: 'idle'
  }
}

export const polymarketData = {
  topMarkets: [
    { name: 'Trump deport 250k-500k', volume: 6583308, yesPrice: 0.88, change: '+2%' },
    { name: 'Trump deport <250k', volume: 1152771, yesPrice: 0.05, change: '-1%' },
    { name: 'Trump deport 500k-750k', volume: 512996, yesPrice: 0.04, change: '0%' },
    { name: 'GTA 6 cost $100+', volume: 4500000, yesPrice: 0.01, change: '0%' },
    { name: 'Fed rate cut March', volume: 450000, yesPrice: 0.65, change: '+5%' },
  ],
  volumeSpikes: [
    { market: 'Ahmed Aboutaleb PM', spike: 33.7, volume: 629989 },
    { market: 'LA Kings NHL', spike: 9.5, volume: 514687 },
    { market: 'Trump deport 250k-500k', spike: 7.0, volume: 459851 },
  ],
  positions: [
    { market: 'Trump deport 250k-500k', side: 'Yes', size: 20, entry: 0.85, current: 0.88 }
  ]
}

export const searchIndex = [
  { file: 'memory/2026-02-15.md', snippet: 'Multi-agent architecture discussion...', type: 'memory' },
  { file: 'TASKS.md', snippet: 'PENDING: none...', type: 'tasks' },
  { file: 'MEMORY.md', snippet: 'Agents Structure, Modes, Skills...', type: 'core' },
  { file: 'agents/trader.md', snippet: 'Trader agent definition with Polymarket...', type: 'agent' },
]

export const ideasData = {
  jaro: [
    {
      name: '🎵 MUZYKA / AUDIO',
      icon: '🎵',
      items: [
        { id: 1, text: 'Stworzyć agenta od muzyki (Suno)', status: '⏳', priority: 'HIGH' },
        { id: 2, text: 'Znaleźć skille do muzyki', status: '⏳', priority: 'HIGH' },
        { id: 3, text: 'Suno API skill — jak polymarket skill', status: '⏳', priority: 'HIGH' },
      ]
    },
    {
      name: '🎬 VIDEO / MOTION',
      icon: '🎬',
      items: [
        { id: 4, text: 'Remotion — video generator', status: '⏳', priority: 'MEDIUM' },
        { id: 5, text: 'Dashboard animowany', status: '⏳', priority: 'MEDIUM' },
        { id: 6, text: 'Trading recap videos', status: '⏳', priority: 'LOW' },
      ]
    }
  ],
  atlas: [
    {
      name: 'TRADING / MARKETS',
      icon: '📊',
      items: [
        { id: 1, text: 'Sentiment analysis z Reddit/Twitter', status: '⏳', priority: 'HIGH', note: 'Polish edge' },
        { id: 2, text: 'Correlation tracker — powiązania markets', status: '⏳', priority: 'MEDIUM' },
        { id: 3, text: 'Whale watcher — duże transakcje', status: '⏳', priority: 'HIGH' },
        { id: 4, text: 'Expiration countdown alerts', status: '⏳', priority: 'MEDIUM' },
      ]
    },
    {
      name: 'SYSTEM / AUTOMATION',
      icon: '🤖',
      items: [
        { id: 5, text: 'Auto-compaction checkpoint', status: '⏳', priority: 'HIGH' },
        { id: 6, text: 'Agent skill inheritance', status: '⏳', priority: 'MEDIUM' },
        { id: 7, text: 'Parallel research workers', status: '⏳', priority: 'HIGH' },
        { id: 8, text: 'Memory hot-swap', status: '⏳', priority: 'LOW' },
      ]
    },
    {
      name: 'TOOLS / DASHBOARD',
      icon: '🛠️',
      items: [
        { id: 9, text: 'P&L chart live', status: '⏳', priority: 'HIGH' },
        { id: 10, text: 'Market watchlist', status: '⏳', priority: 'MEDIUM' },
        { id: 11, text: 'Command history', status: '⏳', priority: 'LOW' },
        { id: 12, text: 'Token burn rate', status: '⏳', priority: 'MEDIUM' },
      ]
    },
    {
      name: 'ORGANIZATION',
      icon: '📁',
      items: [
        { id: 17, text: 'Ideas sync — dashboard ↔ pliki', status: '✅', priority: 'DONE' },
        { id: 18, text: 'Archive completed items', status: '⏳', priority: 'LOW' },
      ]
    }
  ]
}