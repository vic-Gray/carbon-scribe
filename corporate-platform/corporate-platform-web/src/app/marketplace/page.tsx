'use client'

import { useState } from 'react'
import { Filter, Grid, List, Search, TrendingUp, MapPin, Shield, Calendar } from 'lucide-react'
import { useCorporate } from '@/contexts/CorporateContext'
import CreditCard from '@/components/marketplace/CreditCard'
import MarketplaceFilters from '@/components/marketplace/MarketplaceFilters'
import CartSidebar from '@/components/marketplace/CartSidebar'

export default function MarketplacePage() {
  const { credits, cart } = useCorporate()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: [0, 50],
    methodologies: [] as string[],
    countries: [] as string[],
    sdgs: [] as number[],
    vintage: [2020, 2024],
  })

  // Calculate stats
  const totalCredits = credits.reduce((sum, credit) => sum + credit.availableAmount, 0)
  const avgPrice = credits.reduce((sum, credit) => sum + credit.pricePerTon, 0) / credits.length

  return (
    <div className="space-y-6 animate-in">
      {/* Marketplace Header */}
      <div className="bg-linear-to-r from-corporate-navy via-corporate-blue to-corporate-teal rounded-2xl p-6 md:p-8 text-white shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 tracking-tight">
              Carbon Credit Marketplace
            </h1>
            <p className="text-blue-100 opacity-90 max-w-2xl">
              Discover and purchase verified carbon credits from high-impact projects worldwide.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-50">
              <div className="text-sm text-blue-200 mb-1">Available Credits</div>
              <div className="text-2xl font-bold">{totalCredits.toLocaleString()} tCO₂</div>
              <div className="text-xs text-green-300">Across {credits.length} projects</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-50">
              <div className="text-sm text-blue-200 mb-1">Average Price</div>
              <div className="text-2xl font-bold">${avgPrice.toFixed(2)}/ton</div>
              <div className="text-xs text-blue-300">Real-time market price</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Filters */}
        <div className="lg:w-1/4">
          <MarketplaceFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Right Column - Credits & Search */}
        <div className="lg:flex-1">
          {/* Search and Controls */}
          <div className="corporate-card p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="search"
                    placeholder="Search projects by name, country, or methodology..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-corporate-blue"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
                  >
                    <List size={20} />
                  </button>
                </div>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative corporate-btn-primary px-4 py-2"
                >
                  🛒 View Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="corporate-card p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                  <MapPin className="text-corporate-blue" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">8</div>
                </div>
              </div>
            </div>
            <div className="corporate-card p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                  <Shield className="text-green-600" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Verification Standards</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">3</div>
                </div>
              </div>
            </div>
            <div className="corporate-card p-4">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                  <TrendingUp className="text-purple-600" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Dynamic Score</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">89.4</div>
                </div>
              </div>
            </div>
          </div>

          {/* Credits Grid/List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {credits.map((credit) => (
              <CreditCard key={credit.id} credit={credit} viewMode={viewMode} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="corporate-btn-secondary px-3 py-2 rounded-lg">← Previous</button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-2 rounded-lg ${
                    page === 1
                      ? 'bg-corporate-blue text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="corporate-btn-secondary px-3 py-2 rounded-lg">Next →</button>
            </nav>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}