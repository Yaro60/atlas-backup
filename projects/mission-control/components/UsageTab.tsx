'use client'

import { usageData } from '@/lib/data'

export function UsageTab() {
  const contextPercent = (usageData.contextUsed / usageData.contextTotal * 100).toFixed(0)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Session Stats */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">📊 Session Stats</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Context Used</span>
              <span className="text-accent">{contextPercent}%</span>
            </div>
            <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent rounded-full" 
                style={{ width: `${contextPercent}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {usageData.contextUsed.toLocaleString()} / {usageData.contextTotal.toLocaleString()} tokens
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-600">
            <div>
              <div className="text-2xl font-bold">{usageData.tokensIn.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Tokens IN</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{usageData.tokensOut.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Tokens OUT</div>
            </div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">⚙️ System Info</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Model</span>
            <span className="text-accent">{usageData.model}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Runtime</span>
            <span>{usageData.runtime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Session Time</span>
            <span>{usageData.sessionTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Compactions</span>
            <span>{usageData.compactions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Cost</span>
            <span className="text-green-400">£0 (free)</span>
          </div>
        </div>
      </div>

      {/* Limits */}
      <div className="card lg:col-span-2">
        <h3 className="text-lg font-semibold mb-3">🚦 Limits</h3>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-dark-700 rounded">
            <div className="text-xl font-bold text-accent">∞</div>
            <div className="text-xs text-gray-400">API Calls</div>
          </div>
          <div className="p-3 bg-dark-700 rounded">
            <div className="text-xl font-bold">200K</div>
            <div className="text-xs text-gray-400">Context Max</div>
          </div>
          <div className="p-3 bg-dark-700 rounded">
            <div className="text-xl font-bold">RAM</div>
            <div className="text-xs text-gray-400">HW Limit</div>
          </div>
          <div className="p-3 bg-dark-700 rounded">
            <div className="text-xl font-bold text-green-400">£0</div>
            <div className="text-xs text-gray-400">Cost</div>
          </div>
        </div>
      </div>
    </div>
  )
}