'use client'

import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      setThemeState(savedTheme)
    } else if (prefersDark) {
      setThemeState('system')
    }
  }, [])

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme)
    
    if (newTheme === 'system') {
      localStorage.removeItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } else {
      localStorage.setItem('theme', newTheme)
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const toggleTheme = () => {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    setTheme(current === 'dark' ? 'light' : 'dark')
  }

  return {
    theme: mounted ? theme : 'light',
    setTheme,
    toggleTheme,
    mounted,
  }
}