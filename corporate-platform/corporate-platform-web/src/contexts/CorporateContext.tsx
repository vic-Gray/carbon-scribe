'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { mockCorporateData, mockCredits, mockProjects, mockRetirements, mockPortfolio } from '@/lib/mockData'

interface CorporateContextType {
  company: any
  credits: any[]
  projects: any[]
  retirements: any[]
  portfolio: any
  selectedCredit: any | null
  setSelectedCredit: (credit: any) => void
  addToCart: (credit: any) => void
  cart: any[]
  removeFromCart: (creditId: string) => void
  clearCart: () => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const CorporateContext = createContext<CorporateContextType | undefined>(undefined)

export function CorporateProvider({ children }: { children: ReactNode }) {
  const [company] = useState(mockCorporateData)
  const [credits] = useState(mockCredits)
  const [projects] = useState(mockProjects)
  const [retirements] = useState(mockRetirements)
  const [portfolio] = useState(mockPortfolio)
  const [selectedCredit, setSelectedCredit] = useState<any>(null)
  const [cart, setCart] = useState<any[]>([])
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const addToCart = (credit: any) => {
    setCart(prev => [...prev, credit])
  }

  const removeFromCart = (creditId: string) => {
    setCart(prev => prev.filter(item => item.id !== creditId))
  }

  const clearCart = () => {
    setCart([])
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <CorporateContext.Provider value={{
      company,
      credits,
      projects,
      retirements,
      portfolio,
      selectedCredit,
      setSelectedCredit,
      addToCart,
      cart,
      removeFromCart,
      clearCart,
      theme,
      toggleTheme,
    }}>
      {children}
    </CorporateContext.Provider>
  )
}

export const useCorporate = () => {
  const context = useContext(CorporateContext)
  if (!context) {
    throw new Error('useCorporate must be used within CorporateProvider')
  }
  return context
}