'use client'

import { polymarketData } from '@/lib/data'

export function PolymarketTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Top Markets */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-3">📊 Top Markets</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-left">
                <th className="pb-2">Market</th>
                <th className="pb-2 text-right">Volume</th>
                <th className="pb-2 text-right">Yes</th>
                <th className="pb-2 text-right">Δ</th>
              </tr>
            </thead>
            <tbody>
              {polymarketData.topMarkets.map((m, i) => (
                <tr key={i} className="border-t border-dark-600">
                  <td className="py-2 text-gray-300">{m.name}</td>
                  <td className="py-2 text-right">${(m.volume/1000000).toFixed(1)}M</td>
                  <td className="py-2 text-right text-accent">{(m.yesPrice * 100).toFixed(0)}%</td>
                  <td className={`py-2 text-right ${m.change.startsWith('+') ? 'text-green-400' : m.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
                    {m.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Volume Spikes */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-3">🚨 Volume Spikes</h3>
        <div className="space-y-3">
          {polymarketData.volumeSpikes.map((s, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-dark-700 rounded">
              <div>
                <div className="text-gray-300">{s.market}</div>
                <div className="text-xs text-gray-500">24h: ${s.volume.toLocaleString()}</div>
              </div>
              <div className={`text-lg font-bold ${s.spike > 20 ? 'text-red-400' : 'text-yellow-400'}`}>
                +{s.spike}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Positions */}
      <div className="card lg:col-span-2">
        <h3 className="text-lg font-semibold mb-3">💰 Positions</h3>
        {polymarketData.positions.length > 0 ? (
          <div className="grid gap-2">
            {polymarketData.positions.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-dark-700 rounded">
                <div>
                  <div className="text-gray-300">{p.market}</div>
                  <div className="text-xs text-gray-500">{p.side} @ {p.entry}</div>
                </div>
                <div className="text-right">
                  <div className="text-accent">${p.size}</div>
                  <div className="text-xs text-green-400">+{((p.current - p.entry) * 100).toFixed(0)}%</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-4">No active positions</div>
        )}
      </div>
    </div>
  )
}