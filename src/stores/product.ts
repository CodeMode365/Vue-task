// src/store/apiStore.js
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { iProduct } from '@/types/product'

export type iCategories = 'electronics' | 'jewelery' | "men's clothing" | "women's clothing" | ''

export const useApiStore = defineStore('apiStore', {
  state: () => ({
    products: [
      { id: 1, title: 'Product xyz', price: 344, rating: { rate: 3, count: 23 } },
      { id: 2, title: 'Product abcgohh', price: 344, rating: { rate: 3, count: 23 } },
      { id: 3, title: 'Product mno fda hjdfa', price: 344, rating: { rate: 3, count: 23 } },
      { id: 4, title: 'Product defz', price: 344, rating: { rate: 3, count: 23 } }
    ] as iProduct[],
    cart: [] as Partial<iProduct>[],
    currentCategory: '' as iCategories,
    isLoading: false,
    isError: false
  }),

  actions: {
    async fetchProducts() {
      this.isLoading = true
      try {
        const categoryUrl = this.currentCategory === '' ? '' : `category/${this.currentCategory}`
        const { data } = await axios.get(`https://fakestoreapi.com/products/${categoryUrl}`)
        this.products = data as iProduct[]
      } catch (error) {
        this.isError = true
        throw new Error('Failed to fetch data!')
      } finally {
        this.isLoading = false
      }
    },
    updateCategory(category: iCategories) {
      this.currentCategory = category
      this.fetchProducts()
    },
    addToCart(product: Partial<iProduct>) {
      this.cart.push(product)
    },
    deleteFromCart(product: Partial<iProduct>) {
      this.cart = this.cart.filter(({ id }) => id === product.id)
    }
  }
})
