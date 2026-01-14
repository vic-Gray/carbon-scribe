export interface CarbonCredit {
    id: string
    projectId: string
    projectName: string
    country: string
    methodology: string
    vintage: number
    availableAmount: number
    pricePerTon: number
    currency: string
    status: 'available' | 'reserved' | 'retired'
    verificationStandard: 'VERRA' | 'GOLD_STANDARD' | 'CCB'
    sdgs: number[]
    coBenefits: string[]
    imageUrl: string
    lastVerification: string
    dynamicScore: number
  }
  
  export interface Retirement {
    id: string
    creditId: string
    amount: number
    date: string
    purpose: string
    certificateUrl: string
    transactionHash: string
    projectName: string
  }
  
  export interface PortfolioMetrics {
    totalRetired: number
    currentBalance: number
    totalSpent: number
    avgPricePerTon: number
    sdgContributions: Record<number, number>
    monthlyRetirements: Array<{ month: string; amount: number }>
  }
  
  export interface Company {
    id: string
    name: string
    industry: string
    sustainabilityGoals: string[]
    targetNetZero: number
    currentFootprint: number
    creditsRetired: number
    creditsAvailable: number
  }