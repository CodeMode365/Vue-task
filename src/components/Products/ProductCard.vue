<template>
  <div
    class="group relative p-4 w-full border rounded-sm hover:shadow-primary hover:shadow-sm transition"
  >
    <div class="group-hover:block z-10 transition hidden absolute right-5" title="Add to cart">
      <button
        @click="
          addProductIntoCart({
            ...props
          })
        "
        class="bg-white/80 h-8 w-8 border border-primary rounded-full flex items-center justify-center"
      >
        <i class="fa-solid fa-cart-plus text-primary"></i>
      </button>
    </div>
    <RouterLink :to="`/products/${props.id}`" class="block relative h-48 rounded overflow-hidden">
      <img
        alt="ecommerce"
        class="object-contain object-center w-full h-full block hover:scale-110 transition"
        :src="props.image"
      />
    </RouterLink>
    <div class="mt-4">
      <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1 text-primary">
        {{ props.category }}
      </h3>
      <h2 class="text-gray-900 title-font text-lg font-medium h-18">
        {{ props.title.slice(0, 15) }}
        {{ props.title.length > 15 ? '...' : '' }}
      </h2>
      <RatingComponent :rating="props.rating" :withCount="true" />

      <p class="mt-1">$ {{ props.price }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'
import RatingComponent from './RatingComponent.vue'
import { useApiStore } from '@/stores/product'
import { storeToRefs } from 'pinia'

const store = useApiStore()
const { addToCart } = storeToRefs(store)

const addProductIntoCart = (product) => {
  store.addToCart(product)
}

const props = defineProps({
  id: Number,
  title: String,
  price: Number,
  category: String,
  description: String,
  image: String,
  rating: {
    rate: Number,
    count: Number
  }
})
</script>
