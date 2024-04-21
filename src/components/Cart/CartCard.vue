<script setup>
import { useApiStore } from '@/stores/product'
import { storeToRefs } from 'pinia'

const store = useApiStore()
const { updateCartItemQuantity } = storeToRefs(store)

const { title, id, price, image, quantity } = defineProps({
  title: String,
  id: Number,
  quantity: Number,
  price: Number,
  image: String
})
</script>

<template>
  <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
    <img :src="image" alt="product-image" class="w-full rounded-lg sm:w-40" />
    <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
      <div class="mt-5 sm:mt-0">
        <h2 class="text-lg font-bold text-gray-900 overflow-ellipsis">{{ title }}</h2>
        <p class="mt-1 text-lg text-gray-700">${{ price }}</p>
      </div>
      <div class="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
        <div class="flex items-center border-gray-100">
          <span
            class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-sky-600 hover:text-sky-50"
            @click="() => store.updateCartItemQuantity(id, quantity - 1)"
          >
            -
          </span>
          <input
            disabled
            class="h-8 w-8 border bg-white text-center text-xs outline-none"
            type="number"
            :value="quantity"
          />
          <span
            @click="() => store.updateCartItemQuantity(id, quantity + 1)"
            class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-sky-600 hover:text-sky-50"
          >
            +
          </span>
        </div>
        <div class="flex items-center space-x-4">
          <p class="text-sm">$ {{ price * quantity }}</p>
          <button @click="() => store.removeFromCart(id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              u
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
