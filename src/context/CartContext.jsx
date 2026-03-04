import React, { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((i) => i.id === action.payload.id)
      if (existing) {
        return state.map((i) =>
          i.id === action.payload.id ? { ...i, qty: i.qty + (action.payload.qty ?? 1) } : i
        )
      }
      return [...state, { ...action.payload, qty: action.payload.qty ?? 1 }]
    }
    case 'REMOVE':
      return state.filter((i) => i.id !== action.payload)
    case 'SET_QTY': {
      const { id, qty } = action.payload
      if (qty <= 0) return state.filter((i) => i.id !== id)
      return state.map((i) => (i.id === id ? { ...i, qty } : i))
    }
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])

  const addToCart = (product, qty = 1) => {
    dispatch({ type: 'ADD', payload: { ...product, qty } })
  }

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }

  const setQty = (id, qty) => {
    dispatch({ type: 'SET_QTY', payload: { id, qty } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR' })
  }

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  const value = {
    items,
    totalItems,
    subtotal,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
