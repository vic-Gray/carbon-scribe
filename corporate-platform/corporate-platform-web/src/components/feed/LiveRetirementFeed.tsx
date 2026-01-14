'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Globe, Building, Clock } from 'lucide-react'

const mockLiveRetirements = [
  { company: 'Microsoft', amount: 5000, project: 'Amazon Rainforest', time: '2 minutes ago' },
  { company: 'Google', amount: 3000, project: 'Kenya Solar Farms', time: '5 minutes ago' },
  { company: 'Salesforce', amount: 7500, project: 'Indonesia Mangroves', time: '12 minutes ago' },
  { company: 'Apple', amount: 4200, project: 'US Regenerative Ag', time: '25 minutes ago' },
  { company: 'Meta', amount: 1800, project: 'India Wind Power', time: '45 minutes ago' },
]

export default function LiveRetirementFeed() {
  const [retirements, setRetirements] = useState(mockLiveRetirements)
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive && Math.random() > 0.7) {
        const newRetirement = {
          company: ['Amazon', 'Tesla', 'NVIDIA', 'Adobe'][Math.floor(Math.random() * 4)],
          amount: Math.floor(Math.random() * 10000) + 1000,
          project: ['Brazil Conservation', 'African Clean Cookstoves', 'EU Reforestation'][Math.floor(Math.random() * 3)],
          time: 'Just now',
        }
        setRetirements(prev => [newRetirement, ...prev.slice(0, 4)])
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [isLive])

  return (
    <div className="corporate-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mr-3">Live Retirement Feed</h2>
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-1 ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{isLive ? 'LIVE' : 'PAUSED'}</span>
          </div>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-3 py-1 rounded-lg text-sm font-medium ${
            isLive 
              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
          }`}
        >
          {isLive ? 'Pause' : 'Resume'}
        </button>
      </div>

      <div className="space-y-4">
        {retirements.map((retirement, index) => (
          <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="mr-3 mt-1">
              <CheckCircle size={16} className="text-green-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-900 dark:text-white">{retirement.company}</div>
                <div className="font-bold text-corporate-blue">{retirement.amount.toLocaleString()} tCO₂</div>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                <Globe size={12} className="mr-1" />
                {retirement.project}
                <Clock size={12} className="ml-3 mr-1" />
                {retirement.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-linear-to-r from-corporate-navy to-corporate-blue text-white rounded-full">
            <Building size={14} className="mr-2" />
            <span>Your company retired 15,000 tCO₂ this month</span>
          </div>
        </div>
      </div>
    </div>
  )
}