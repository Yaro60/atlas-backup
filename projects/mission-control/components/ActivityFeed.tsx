'use client'

import { activityData } from '@/lib/data'

const typeIcons: Record<string, string> = {
  file: '📄',
  command: '⚡',
  message: '💬',
  task: '✅',
  agent: '🤖'
}

const typeColors: Record<string, string> = {
  file: 'text-blue-400',
  command: 'text-yellow-400',
  message: 'text-green-400',
  task: 'text-emerald-400',
  agent: 'text-purple-400'
}

export function ActivityFeed() {
  return (
    <div className="card max-h-80 overflow-y-auto">
      <div className="space-y-2">
        {activityData.map(item => (
          <div key={item.id} className="flex items-center gap-3 py-2 border-b border-dark-600 last:border-0">
            <span className="text-lg">{typeIcons[item.type]}</span>
            <div className="flex-1">
              <span className={typeColors[item.type]}>{item.action}</span>
              <span className="text-gray-300"> {item.target}</span>
            </div>
            <span className="text-xs text-gray-500">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}