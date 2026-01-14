'use client'

import { useState } from 'react'
import { MapPin, Calendar, Shield, TrendingUp, ShoppingCart, Eye } from 'lucide-react'
import { useCorporate } from '@/contexts/CorporateContext'

export default function CreditMarketplace() {
  const { credits, addToCart } = useCorporate()
  const [selectedMethodology, setSelectedMethodology] = useState('all')

  const methodologies = ['all', 'REDD+', 'AR-AM0001', 'AMS-I.D.', 'VCS']

  return (
    <div className="corporate-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Credit Marketplace</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Available carbon credits for purchase</p>
        </div>
        <button className="corporate-btn-primary text-sm px-4 py-2">
          <ShoppingCart size={16} className="mr-2" />
          View Cart
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {methodologies.map((method) => (
          <button
            key={method}
            onClick={() => setSelectedMethodology(method)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedMethodology === method
                ? 'bg-corporate-blue text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {method === 'all' ? 'All' : method}
          </button>
        ))}
      </div>

      {/* Credits List */}
      <div className="space-y-4 max-h-100 overflow-y-auto pr-2">
        {credits.slice(0, 3).map((credit) => (
          <div key={credit.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-corporate-blue/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{credit.projectName}</h3>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <MapPin size={14} className="mr-1" />
                  {credit.country}
                  <Calendar size={14} className="ml-3 mr-1" />
                  Vintage {credit.vintage}
                  <Shield size={14} className="ml-3 mr-1" />
                  {credit.verificationStandard}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  credit.status === 'available' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                }`}>
                  {credit.status.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Available</div>
                <div className="font-bold text-gray-900 dark:text-white">{credit.availableAmount.toLocaleString()} tCO₂</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Price</div>
                <div className="font-bold text-gray-900 dark:text-white">${credit.pricePerTon}/ton</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Dynamic Score</div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                    <div 
                      className={`h-2 rounded-full ${
                        credit.dynamicScore >= 90 ? 'bg-green-500' :
                        credit.dynamicScore >= 80 ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${credit.dynamicScore}%` }}
                    ></div>
                  </div>
                  <span className="font-bold">{credit.dynamicScore}</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">SDGs</div>
                <div className="flex space-x-1">
                  {credit.sdgs.map((sdg: number) => (
                    <span key={sdg} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs">
                      {sdg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Last verified: {new Date(credit.lastVerification).toLocaleDateString()}
              </div>
              <div className="flex space-x-2">
                <button className="corporate-btn-secondary text-sm px-3 py-1.5">
                  <Eye size={14} className="mr-1" />
                  Details
                </button>
                <button 
                  onClick={() => addToCart(credit)}
                  className="corporate-btn-primary text-sm px-3 py-1.5"
                  disabled={credit.status !== 'available'}
                >
                  <ShoppingCart size={14} className="mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-corporate-blue hover:text-corporate-blue/80 font-medium text-sm">
          View all available credits →
        </button>
      </div>
    </div>
  )
}