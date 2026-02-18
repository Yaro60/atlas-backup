'use client'

import { useState } from 'react'
import { ActivityFeed } from '@/components/ActivityFeed'
import { CalendarView } from '@/components/CalendarView'
import { GlobalSearch } from '@/components/GlobalSearch'
import { PolymarketTab } from '@/components/PolymarketTab'
import { AgentsTab, IdeasTab } from '@/components/AgentsTab'
import { UsageTab } from '@/components/UsageTab'

export default function MissionControl() {
  const [tab, setTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: '🎛️ Overview' },
    { id: 'polymarket', label: '📈 Polymarket' },
    { id: 'agents', label: '🤖 Agents' },
    { id: 'ideas', label: '💡 Pomysły' },
    { id: 'usage', label: '📊 Usage' },
    { id: 'search', label: '🔍 Search' }
  ]

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-accent">🎛️ Mission Control</h1>
        <div className="text-sm text-gray-400">
          Sunday, Feb 15, 2026 — 12:02 PM
        </div>
      </header>

      {/* Tabs */}
      <nav className="flex gap-1 mb-6 border-b border-dark-600">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm transition ${
              tab === t.id ? 'tab-active' : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="grid gap-6">
        {tab === 'overview' && <OverviewTab />}
        {tab === 'polymarket' && <PolymarketTab />}
        {tab === 'agents' && <AgentsTab />}
        {tab === 'ideas' && <IdeasTab />}
        {tab === 'usage' && <UsageTab />}
        {tab === 'search' && <GlobalSearch />}
      </main>
    </div>
  )
}

function OverviewTab() {
  const stats = [
    { label: 'Context', value: '92k/200k', sub: '46%' },
    { label: 'Tokens In', value: '431k', sub: 'input' },
    { label: 'Tokens Out', value: '2.1k', sub: 'output' },
    { label: 'Session', value: '1h 15m', sub: 'active' }
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Stats */}
      <div className="lg:col-span-3 grid grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="card text-center">
            <div className="text-2xl font-bold text-accent">{s.value}</div>
            <div className="text-xs text-gray-400">{s.label} · {s.sub}</div>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="lg:col-span-2">
        <h2 className="text-lg font-semibold mb-3">📋 Activity Feed</h2>
        <ActivityFeed />
      </div>

      {/* Calendar */}
      <div>
        <h2 className="text-lg font-semibold mb-3">📅 Calendar</h2>
        <CalendarView />
      </div>
    </div>
  )
}