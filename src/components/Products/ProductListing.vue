<template>
  <section class="text-gray-600 body-font w-full">
    <div class="my-2 w-full flex justify-end mx-2">
      <div class="w-80 px-8 mb-4">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >Search</label
        >
        <div class="relative flex items-center">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            v-model="searchText"
            type="search"
            id="default-search"
            class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Search... "
            required
          />
          <button
            type="submit"
            class="absolute right-1 bg-secondary text-white px-2 py-1 rounded-md"
            @click="onSearch()"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    <div class="container px-5 mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[60vh]">
        <h2 v-if="filteredData <= 0">No product found!</h2>
        <h2 v-if="!data">Loading...</h2>
        <ProductCard
          v-else
          v-for="(product, index) in filteredData"
          :key="index"
          :id="product.id"
          :title="product.title"
          :price="product.price"
          :category="product.category"
          :description="product.image"
          :image="product.image"
          :rating="product.rating"
        />
      </div>
      <div class="w-full flex items-center justify-center my-4">
        <PageComponent
          v-if="data && currentPage && totalPages"
          :changePage="changePage"
          :currentPage="currentPage"
          :totalPage="totalPages"
        ></PageComponent>
      </div>
    </div>
  </section>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
import PageComponent from './PageComponent.vue'
import { fetchProducts, searchProduct } from '@/hooks/product'
import { onMounted, watch, ref, computed } from 'vue'
const data = ref(null)
const filteredData = ref(null)
const searchText = ref('')
let currentPage = ref(1)

const onSearch = async () => {
  filteredData.value = await searchProduct(data.value, searchText.value)
}

onMounted(async () => {
  data.value = await fetchProducts()
  paginateData()
})

watch(currentPage, () => {
  paginateData()
})

const paginateData = () => {
  console.log(data.value.length, currentPage.value)
  const startIndex = (currentPage.value - 1) * 8
  const newData = [...data.value].slice(startIndex, startIndex + 8)
  console.log(data)
  filteredData.value = newData
}

const totalPages = computed(() => {
  return Math.ceil(data.value.length / 8)
})
const changePage = (page) => {
  currentPage.value = page
}
</script>
