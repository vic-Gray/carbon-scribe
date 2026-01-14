'use client'

import { useState } from 'react'
import { Search, Bell, Settings, User, ChevronDown, Menu, X } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useCorporate } from '@/contexts/CorporateContext'

export default function CorporateNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { toggleTheme, theme, mounted } = useTheme()
  const { company, cart } = useCorporate()

  // Don't render theme toggle until mounted to avoid hydration mismatch
  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="px-4 md:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-linear-to-br from-corporate-blue to-corporate-teal rounded-lg"></div>
              <div>
                <h1 className="font-bold text-lg bg-linear-to-r from-corporate-navy to-corporate-blue dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
                  CarbonScribe
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Corporate Platform</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="search"
                placeholder="Search credits, projects, or analytics..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-corporate-blue"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {document.documentElement.classList.contains('dark') ? '🌞' : '🌙'}
            </button>

            {/* Cart */}
            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                <div className="w-5 h-5 flex items-center justify-center">
                  🛒
                </div>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Bell size={20} />
              </button>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>

            {/* Company Profile */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <p className="font-medium text-sm">{company.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{company.industry}</p>
              </div>
              <div className="relative">
                <div className="w-9 h-9 bg-linear-to-br from-corporate-blue to-corporate-teal rounded-full flex items-center justify-center text-white font-medium">
                  TG
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </div>

            {/* Settings */}
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-corporate-blue"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-br from-corporate-blue to-corporate-teal rounded-full flex items-center justify-center text-white font-medium">
                TG
              </div>
              <div>
                <p className="font-medium">{company.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{company.industry}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="corporate-btn-secondary">Profile</button>
              <button className="corporate-btn-primary">Retire Credits</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
