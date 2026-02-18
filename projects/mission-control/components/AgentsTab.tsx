'use client'

import { useState } from 'react'
import { agentsData, ideasData } from '@/lib/data'

const statusColors: Record<string, string> = {
  active: 'bg-green-500',
  ready: 'bg-accent',
  idle: 'bg-gray-500'
}

const priorityColors: Record<string, string> = {
  HIGH: 'text-red-400',
  MEDIUM: 'text-yellow-400',
  LOW: 'text-gray-400',
  DONE: 'text-green-400'
}

export function AgentsTab() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {Object.values(agentsData).map(agent => (
        <div key={agent.name} className="card">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{agent.name}</h3>
              <p className="text-sm text-gray-400">{agent.role}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${statusColors[agent.status]}`} />
              <span className="text-xs text-gray-400 capitalize">{agent.status}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-dark-600 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Model:</span>
              <span className="ml-1 text-accent">{agent.model}</span>
            </div>
            <div>
              <span className="text-gray-500">Context:</span>
              <span className="ml-1">{agent.context}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function IdeasTab() {
  const [owner, setOwner] = useState<'jaro' | 'atlas'>('jaro')

  const data = ideasData[owner]

  return (
    <div className="space-y-4">
      {/* Sub-tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setOwner('jaro')}
          className={`px-4 py-2 rounded text-sm ${
            owner === 'jaro' 
              ? 'bg-accent text-dark-900 font-bold' 
              : 'bg-dark-700 text-gray-400 hover:text-white'
          }`}
        >
          💡 Jaro
        </button>
        <button
          onClick={() => setOwner('atlas')}
          className={`px-4 py-2 rounded text-sm ${
            owner === 'atlas' 
              ? 'bg-accent text-dark-900 font-bold' 
              : 'bg-dark-700 text-gray-400 hover:text-white'
          }`}
        >
          🤠 Atlas
        </button>
      </div>

      {/* Ideas list */}
      {data.map(cat => (
        <div key={cat.name} className="card">
          <h3 className="text-lg font-semibold mb-3">{cat.icon} {cat.name}</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-left">
                <th className="pb-2 w-8">#</th>
                <th className="pb-2">Pomysł</th>
                <th className="pb-2 w-16 text-center">Status</th>
                <th className="pb-2 w-20 text-right">Priorytet</th>
              </tr>
            </thead>
            <tbody>
              {cat.items.map((item, i) => (
                <tr key={i} className="border-t border-dark-600">
                  <td className="py-2 text-gray-500">{item.id}</td>
                  <td className="py-2 text-gray-300">
                    {item.text}
                    {'note' in item && <span className="text-xs text-gray-500 ml-2">({item.note})</span>}
                  </td>
                  <td className="py-2 text-center text-lg">{item.status}</td>
                  <td className={`py-2 text-right ${priorityColors[item.priority]}`}>{item.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}