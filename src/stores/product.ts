// src/store/apiStore.js
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { iProduct } from '@/types/product'
import { useToast } from 'vue-toastification'

export type iCategories = 'electronics' | 'jewelery' | "men's clothing" | "women's clothing" | ''
const toast = useToast()

export const useApiStore = defineStore('apiStore', {
  state: () => ({
    products: [
      { id: 1, title: 'Product xyz', price: 344, rating: { rate: 3, count: 23 } },
      { id: 2, title: 'Product abcgohh', price: 344, rating: { rate: 3, count: 23 } },
      { id: 3, title: 'Product mno fda hjdfa', price: 344, rating: { rate: 3, count: 23 } },
      { id: 4, title: 'Product defz', price: 344, rating: { rate: 3, count: 23 } }
    ] as iProduct[],
    cart: [] as any[],
    currentCategory: '' as iCategories,
    sorting: '',
    isLoading: false,
    isError: false
  }),
  getters: {
    totalCartItems(): number {
      return this.cart.reduce((total, item) => total + item.quantity, 0).toFixed(2)
    },
    totalCartPrice(): number {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  },
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
    deleteFromCart(product: Partial<iProduct>) {
      this.cart = this.cart.filter(({ id }) => id === product.id)
    },
    updateSorting(sortvalue: string) {
      this.sorting = sortvalue
    },
    addToCart(product: iProduct) {
      const existingItemIndex = this.cart.findIndex((item) => item.id === product.id)
      if (existingItemIndex !== -1) {
        this.cart[existingItemIndex].quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
      toast.success('Added to cart!')
    },

    removeFromCart(productId: number) {
      this.cart = this.cart.filter((item) => item.id !== productId)
      toast.error('Product deleted from cart!')
    },

    updateCartItemQuantity(productId: number, quantity: number) {
      const item = this.cart.find((item) => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },

    clearCart() {
      this.cart = []
    }
  }
})
