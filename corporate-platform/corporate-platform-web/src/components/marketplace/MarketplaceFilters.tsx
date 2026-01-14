'use client'

import { Filter, X } from 'lucide-react'
import { useState } from 'react'

interface MarketplaceFiltersProps {
  filters: any
  setFilters: (filters: any) => void
}

export default function MarketplaceFilters({ filters, setFilters }: MarketplaceFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const methodologies = ['REDD+', 'AR-AM0001', 'AMS-I.D.', 'VCS', 'Gold Standard', 'CCB']
  const countries = ['Brazil', 'Indonesia', 'Kenya', 'USA', 'India', 'Vietnam', 'Peru', 'Colombia']
  const sdgs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

  const toggleMethodology = (methodology: string) => {
    setFilters({
      ...filters,
      methodologies: filters.methodologies.includes(methodology)
        ? filters.methodologies.filter((m: string) => m !== methodology)
        : [...filters.methodologies, methodology]
    })
  }

  const toggleCountry = (country: string) => {
    setFilters({
      ...filters,
      countries: filters.countries.includes(country)
        ? filters.countries.filter((c: string) => c !== country)
        : [...filters.countries, country]
    })
  }

  const toggleSDG = (sdg: number) => {
    setFilters({
      ...filters,
      sdgs: filters.sdgs.includes(sdg)
        ? filters.sdgs.filter((s: number) => s !== sdg)
        : [...filters.sdgs, sdg]
    })
  }

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 50],
      methodologies: [],
      countries: [],
      sdgs: [],
      vintage: [2020, 2024],
    })
  }

  return (
    <div className="corporate-card p-5 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter size={20} className="mr-2 text-corporate-blue" />
          <h3 className="font-bold text-gray-900 dark:text-white">Filters</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          {isExpanded ? <X size={18} /> : <Filter size={18} />}
        </button>
      </div>

      {isExpanded && (
        <>
          {/* Active Filters */}
          {(filters.methodologies.length > 0 || filters.countries.length > 0 || filters.sdgs.length > 0) && (
            <div className="mb-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Active Filters</div>
              <div className="flex flex-wrap gap-2">
                {filters.methodologies.map((m: string) => (
                  <span key={m} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs flex items-center">
                    {m}
                    <button
                      onClick={() => toggleMethodology(m)}
                      className="ml-1 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.countries.map((c: string) => (
                  <span key={c} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-xs flex items-center">
                    {c}
                    <button
                      onClick={() => toggleCountry(c)}
                      className="ml-1 hover:text-green-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.sdgs.map((s: number) => (
                  <span key={s} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-xs flex items-center">
                    SDG {s}
                    <button
                      onClick={() => toggleSDG(s)}
                      className="ml-1 hover:text-purple-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:text-red-800 dark:text-red-400"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}

          {/* Price Range */}
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">Price Range</div>
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="50"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)]})}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
                <span>$0/ton</span>
                <span>${filters.priceRange[1]}/ton</span>
              </div>
            </div>
          </div>

          {/* Methodology */}
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">Methodology</div>
            <div className="space-y-2">
              {methodologies.map((method) => (
                <label key={method} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.methodologies.includes(method)}
                    onChange={() => toggleMethodology(method)}
                    className="h-4 w-4 text-corporate-blue rounded border-gray-300 dark:border-gray-600 focus:ring-corporate-blue"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Country */}
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">Country</div>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {countries.map((country) => (
                <label key={country} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.countries.includes(country)}
                    onChange={() => toggleCountry(country)}
                    className="h-4 w-4 text-corporate-blue rounded border-gray-300 dark:border-gray-600 focus:ring-corporate-blue"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{country}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SDGs */}
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">Sustainable Development Goals</div>
            <div className="grid grid-cols-4 gap-2">
              {sdgs.map((sdg) => (
                <button
                  key={sdg}
                  onClick={() => toggleSDG(sdg)}
                  className={`p-2 rounded text-xs font-medium ${
                    filters.sdgs.includes(sdg)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {sdg}
                </button>
              ))}
            </div>
          </div>

          {/* Vintage Year */}
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">Vintage Year</div>
            <div className="px-2">
              <input
                type="range"
                min="2020"
                max="2024"
                step="1"
                value={filters.vintage[1]}
                onChange={(e) => setFilters({...filters, vintage: [filters.vintage[0], parseInt(e.target.value)]})}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
                <span>{filters.vintage[0]}</span>
                <span>{filters.vintage[1]}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}