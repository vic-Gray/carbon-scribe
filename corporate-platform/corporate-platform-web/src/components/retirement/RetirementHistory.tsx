'use client'

import { ExternalLink, FileText, CheckCircle, Globe } from 'lucide-react'
import { useCorporate } from '@/contexts/CorporateContext'

export default function RetirementHistory() {
  const { retirements } = useCorporate()

  return (
    <div className="corporate-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Retirements</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">On-chain verified carbon credit retirements</p>
        </div>
        <button className="corporate-btn-primary text-sm px-4 py-2">
          <CheckCircle size={16} className="mr-2" />
          New Retirement
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Project</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Purpose</th>
              <th className="pb-3 font-medium">Certificate</th>
              <th className="pb-3 font-medium">Transaction</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {retirements.map((retirement) => (
              <tr key={retirement.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(retirement.date).toLocaleDateString()}
                  </div>
                </td>
                <td className="py-4">
                  <div className="font-medium text-gray-900 dark:text-white">{retirement.projectName}</div>
                </td>
                <td className="py-4">
                  <div className="font-bold text-corporate-blue">{retirement.amount.toLocaleString()} tCO₂</div>
                </td>
                <td className="py-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">{retirement.purpose}</div>
                </td>
                <td className="py-4">
                  <a
                    href={retirement.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-corporate-blue hover:text-corporate-blue/80"
                  >
                    <FileText size={14} className="mr-1" />
                    View
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                </td>
                <td className="py-4">
                  <a
                    href={`https://stellar.expert/explorer/public/tx/${retirement.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-corporate-blue"
                  >
                    <Globe size={14} className="mr-1" />
                    {retirement.transactionHash.slice(0, 8)}...
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex items-center">
          <CheckCircle className="text-green-600 dark:text-green-400 mr-3" size={20} />
          <div>
            <div className="font-medium text-green-800 dark:text-green-300">All retirements verified on-chain</div>
            <div className="text-sm text-green-700/80 dark:text-green-400/80">
              Immutable proof stored on Stellar blockchain with Soroban smart contracts
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}