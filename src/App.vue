<script setup>
import { RouterView, RouterLink } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useApiStore } from './stores/product'
import { storeToRefs } from 'pinia'
const store = useApiStore()
const { cart } = storeToRefs(store)
</script>

<template>
  <div class="min-h-screen bg-white text-gray-">
    <div>
      <Navbar>
        <RouterLink class="mx-2" to="/">Home</RouterLink>
        <RouterLink class="mx-2" to="/products">Products</RouterLink>
        <RouterLink class="mx-2 relative" to="/cart"
          >Cart
          <span
            class="absolute -top-1/3 -right-1/2 border rounded-full h-5 w-5 flex items-center justify-center text-white font-semibold bg-secondary border-primary"
            >{{ cart.length }}</span
          >
        </RouterLink>
      </Navbar>
      <main class="container mx-auto p-4">
        <RouterView />
      </main>
      <Footer />
    </div>
  </div>
</template>
