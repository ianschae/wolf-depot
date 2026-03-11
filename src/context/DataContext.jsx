import React, { createContext, useContext, useState, useEffect } from 'react'
import { categories as staticCategories, products as staticProducts } from '../data/products'
import { fetchCategories, fetchProducts } from '../api.js'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [categories, setCategories] = useState(staticCategories)
  const [products, setProducts] = useState(staticProducts)

  useEffect(() => {
    let ok = true
    Promise.all([fetchCategories(), fetchProducts()])
      .then(([cats, prods]) => {
        if (ok) {
          setCategories(cats)
          setProducts(prods)
        }
      })
      .catch(() => {})
    return () => { ok = false }
  }, [])

  const getProduct = (id) => products.find((p) => p.id === id)

  return (
    <DataContext.Provider value={{ categories, products, getProduct }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
