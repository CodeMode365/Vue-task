<script setup>
import CartCard from './CartCard.vue'
import { useApiStore } from '@/stores/product'
import { storeToRefs } from 'pinia'

const store = useApiStore()
const { cart } = storeToRefs(store)

console.log(cart)
</script>

<template>
  <div class="h-screen pt-20">
    <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div class="rounded-lg md:w-2/3">
        <CartCard
          v-for="(item, i) in cart"
          :key="'cart-item-' + i"
          :id="item.id"
          :title="item.title"
          :quantity="item.quantity"
          :price="item.price"
          :image="item.image"
        >
        </CartCard>
      </div>

      <!-- Sub total -->
      <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div class="mb-2 flex justify-between">
          <p class="text-gray-700">Subtotal</p>
          <p class="text-gray-700">${{ store.totalCartPrice }}</p>
        </div>
        <div class="flex justify-between">
          <p class="text-gray-700">Shipping</p>
          <p class="text-gray-700">$0</p>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between">
          <p class="text-lg font-bold">Total</p>
          <div class="">
            <p class="mb-1 text-lg font-bold">${{ store.totalCartPrice }}</p>
            <p class="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <button
          class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
        >
          Check out
        </button>
      </div>
    </div>
  </div>
</template>
