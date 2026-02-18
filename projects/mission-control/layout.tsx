import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mission Control — OpenClaw',
  description: 'Dashboard for multi-agent system'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className="dark">
      <body className="bg-dark-900 text-gray-100 antialiased">
        {children}
      </body>
    </html>
  )
}