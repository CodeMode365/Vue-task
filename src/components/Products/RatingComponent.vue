<template>
  <div>
    <span v-for="(star, i) in Math.floor(props.rating.rate)" :key="'filled-star-' + i"
      ><i class="fa-solid fa-star text-yellow-500 mx-[1px]"></i
    ></span>

    <span v-for="(star, i) in 5 - Math.floor(props.rating.rate)" :key="'filled-star-' + i"
      ><i class="fa-regular fa-star text-yellow-500 mx-[1px]"></i
    ></span>

    <span class="text-sm" v-if="withCount"> ({{ props.rating.count }})</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  rating: {
    rate: Number,
    count: Number
  },
  withCount: Boolean
})
</script>
