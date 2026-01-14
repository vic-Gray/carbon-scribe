'use client'

import { Zap, TrendingUp, FileText, Download, Upload, Settings } from 'lucide-react'

const actions = [
  { icon: Zap, label: 'Instant Retirement', description: 'Retire credits in seconds', color: 'bg-linear-to-r from-blue-500 to-cyan-500', href: '/retirement' },
  { icon: TrendingUp, label: 'Portfolio Report', description: 'Generate monthly report', color: 'bg-linear-to-r from-teal-500 to-emerald-500', href: '/reporting' },
  { icon: FileText, label: 'Compliance Docs', description: 'Access regulatory documents', color: 'bg-linear-to-r from-purple-500 to-pink-500', href: '/compliance' },
  { icon: Download, label: 'Export Data', description: 'Download all transactions', color: 'bg-linear-to-r from-orange-500 to-red-500', href: '/export' },
  { icon: Upload, label: 'Bulk Purchase', description: 'Upload credit list', color: 'bg-linear-to-r from-indigo-500 to-blue-500', href: '/bulk-purchase' },
  { icon: Settings, label: 'Preferences', description: 'Customize settings', color: 'bg-linear-to-r from-gray-500 to-slate-500', href: '/settings' },
]

export default function QuickActions() {
  return (
    <div className="corporate-card p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="group flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-corporate-blue hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
          >
            <div className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <action.icon size={24} className="text-white" />
            </div>
            <div className="font-medium text-gray-900 dark:text-white text-center mb-1">{action.label}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 text-center">{action.description}</div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center">
          <Zap className="text-blue-600 dark:text-blue-400 mr-3" size={20} />
          <div>
            <div className="font-medium text-blue-800 dark:text-blue-300">Real-time retirement available</div>
            <div className="text-sm text-blue-700/80 dark:text-blue-400/80">
              Retire credits instantly with on-chain verification
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}