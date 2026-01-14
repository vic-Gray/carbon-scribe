'use client'

import { X, ShoppingCart, CreditCard, Trash2 } from 'lucide-react'
import { useCorporate } from '@/contexts/CorporateContext'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, clearCart } = useCorporate()

  const subtotal = cart.reduce((sum, item) => sum + (item.pricePerTon * 1000), 0) // Assuming 1000 tons per item
  const serviceFee = subtotal * 0.05
  const total = subtotal + serviceFee

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white dark:bg-gray-900 z-50 shadow-2xl transform transition-transform duration-300">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingCart className="text-corporate-blue mr-3" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Shopping Cart</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cart.length} item{cart.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <ShoppingCart size={64} className="text-gray-300 dark:text-gray-700 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
                <p className="text-gray-600 dark:text-gray-400">Add carbon credits to start your purchase</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="corporate-card p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                          {item.projectName}
                        </h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {item.country} • {item.methodology}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-red-600 dark:text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500 dark:text-gray-400">Price</div>
                        <div className="font-medium">${item.pricePerTon}/ton</div>
                      </div>
                      <div>
                        <div className="text-gray-500 dark:text-gray-400">Quantity</div>
                        <div className="font-medium">1,000 tCO₂</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <div className="text-gray-600 dark:text-gray-400">Subtotal</div>
                        <div className="font-bold text-lg text-gray-900 dark:text-white">
                          ${(item.pricePerTon * 1000).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-800 p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Service Fee (5%)</span>
                  <span className="font-medium">${serviceFee.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span>${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full corporate-btn-primary py-3">
                  <CreditCard size={20} className="mr-2" />
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full corporate-btn-secondary py-3"
                >
                  Clear Cart
                </button>
                <button
                  onClick={onClose}
                  className="w-full text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 py-2"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}