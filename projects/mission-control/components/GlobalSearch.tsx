'use client'

import { searchIndex } from '@/lib/data'

export function GlobalSearch() {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="card">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search memory, tasks, conversations..."
            className="flex-1 bg-dark-700 border border-dark-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-accent"
          />
          <button className="px-4 py-2 bg-accent text-dark-900 rounded font-medium">
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="card">
        <h3 className="text-sm font-medium mb-3">Recent Files</h3>
        <div className="space-y-2">
          {searchIndex.map((item, i) => (
            <div key={i} className="p-2 hover:bg-dark-700 rounded cursor-pointer">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">📄</span>
                <span className="text-accent text-sm">{item.file}</span>
                <span className="text-xs text-gray-500 bg-dark-600 px-1 rounded">{item.type}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-6">{item.snippet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}