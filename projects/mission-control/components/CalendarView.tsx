'use client'

import { calendarData } from '@/lib/data'

export function CalendarView() {
  return (
    <div className="card">
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Header */}
        {calendarData.week.map(d => (
          <div key={d.day} className="text-xs text-gray-400 py-1">
            {d.day}
          </div>
        ))}
        
        {/* Events */}
        {calendarData.week.map((d, i) => (
          <div key={i} className="py-2 border border-dark-600 rounded min-h-12">
            {d.events.map((e, j) => (
              <div key={j} className="text-xs px-1">
                <span className="text-accent">●</span>
                <span className="text-gray-300 ml-1">{e.name}</span>
              </div>
            ))}
            {d.events.length === 0 && (
              <div className="text-xs text-gray-600">—</div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 pt-3 border-t border-dark-600 text-xs text-gray-400">
        <div className="flex gap-4">
          <span><span className="text-accent">●</span> Scheduled</span>
          <span>Heartbeat: 08:00 daily</span>
          <span>Morning Brief: 07:00</span>
        </div>
      </div>
    </div>
  )
}