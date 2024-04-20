<template>
  <nav aria-label="Page navigation ">
    <ul class="inline-flex -space-x-px text-sm">
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg"
          @click="decrementPage()"
          >Previous</a
        >
      </li>
      <li v-for="page in totalPage" :key="page">
        <a
          href="#"
          class="flex items-center justify-center px-3 h-8 leading-tight"
          :class="{
            'text-primary border border-gray-300 bg-secondary90': page === currentPage,
            'text-gray-500 bg-white border border-gray-300 ': page !== currentPage
          }"
          @click="changePage(page)"
          >{{ page }}</a
        >
      </li>
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg"
          @click="incrementPage()"
          >Next</a
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue'

const { currentPage, totalPage, changePage } = defineProps({
  currentPage: Number,
  totalPage: Number,
  changePage: Function
})

const decrementPage = () => {
  console.log(currentPage)
  if (currentPage - 1 >= 0) changePage(currentPage - 1)
}
const incrementPage = () => {
  if (currentPage + 1 <= totalPage) changePage(currentPage + 1)
}
</script>
