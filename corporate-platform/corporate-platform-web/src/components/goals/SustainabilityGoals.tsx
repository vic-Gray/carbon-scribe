'use client'

import { Target, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useCorporate } from '@/contexts/CorporateContext'

export default function SustainabilityGoals() {
  const { company } = useCorporate()

  const goals = [
    {
      id: 1,
      title: 'Net Zero by 2030',
      description: 'Achieve carbon neutrality across all operations',
      progress: 68,
      target: 100,
      status: 'on-track',
      icon: Target,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      title: '100% Renewable Energy',
      description: 'Power all facilities with clean energy',
      progress: 85,
      target: 100,
      status: 'ahead',
      icon: TrendingUp,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
    },
    {
      id: 3,
      title: 'Scope 3 Reduction',
      description: 'Reduce supply chain emissions by 50%',
      progress: 42,
      target: 50,
      status: 'behind',
      icon: AlertCircle,
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
    },
    {
      id: 4,
      title: 'Circular Economy',
      description: 'Implement waste reduction initiatives',
      progress: 75,
      target: 100,
      status: 'on-track',
      icon: CheckCircle,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'text-green-600 dark:text-green-400'
      case 'on-track': return 'text-blue-600 dark:text-blue-400'
      case 'behind': return 'text-orange-600 dark:text-orange-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ahead': return 'Ahead of schedule'
      case 'on-track': return 'On track'
      case 'behind': return 'Needs attention'
      default: return 'In progress'
    }
  }

  return (
    <div className="corporate-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sustainability Goals</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Track progress towards corporate targets</p>
        </div>
        <div className="flex items-center text-sm text-corporate-blue">
          <Clock size={16} className="mr-1" />
          Updated today
        </div>
      </div>

      <div className="space-y-6">
        {goals.map((goal) => {
          const Icon = goal.icon
          return (
            <div key={goal.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`${goal.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{goal.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{goal.description}</p>
                  </div>
                </div>
                <div className={`text-sm font-medium ${getStatusColor(goal.status)}`}>
                  {getStatusText(goal.status)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {goal.progress}% of {goal.target}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${goal.color.split(' ')[0]}`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>

              {goal.status === 'behind' && (
                <div className="mt-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center text-sm text-orange-800 dark:text-orange-300">
                    <AlertCircle size={16} className="mr-2 shrink-0" />
                    <span>Consider additional carbon credit purchases to accelerate progress</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Overall progress towards Net Zero
          </div>
          <div className="text-2xl font-bold text-corporate-blue">
            {Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}%
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
          <div
            className="h-2 rounded-full bg-linear-to-r from-corporate-blue to-corporate-teal"
            style={{ width: `${Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}