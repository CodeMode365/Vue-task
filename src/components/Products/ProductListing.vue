<template>
  <section class="text-gray-600 body-font w-full" @click="closeOptions">
    <div class="mb-4">
      <div
        class="my-2 w-full flex flex-col gap-y-2 items-end md:items-center md:flex-row justify-end mx-2"
      >
        <div class="flex gap-4">
          <PriceSorting :showFilter="showFilter"></PriceSorting>
          <CategoryFilter :showCategories="showCategories"></CategoryFilter>
        </div>

        <div class="w-80 px-8 relative">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Search</label
          >
          <div class="relative flex items-center">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
              @input="
                () => {
                  suggestFn()
                  if (searchText.value == '') suggestions = []
                }
              "
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
          <div v-if="suggestions.length > 0" :class="'relative w-full min-h-max'">
            <ul
              class="py-2 text-sm absolute w-full h-auto bg-white z-40 shadow-md border mt-1 rounded-md"
              aria-labelledby="dropdownDefaultButton"
            >
              <li
                v-for="(sugg, ind) in [...suggestions]"
                :key="ind"
                :class="[
                  'hover:bg-sky-200 hover:text-primary rounded-md',
                  currentCategory == sugg.title ? 'text-primary bg-sky-50' : ''
                ]"
                @click="
                  () => {
                    searchText = sugg.title
                    onSearch()
                    suggestions = []
                  }
                "
              >
                <a
                  href="#"
                  class="block px-4 py-2 overflow-hidden whitespace-nowrap overflow-ellipsis"
                  >{{ sugg.title }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="container px-5 mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[60vh]">
        <h2 v-if="!isLoading && !isError && filteredData <= 0">No product found!</h2>
        <h3 v-if="!isLoading && isError && filteredData <= 0">Server error!</h3>
        <h2 v-if="isLoading">Loading...</h2>
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
        <!-- <PageComponent
          v-if="products && currentPage && totalPages"
          :changePage="changePage"
          :currentPage="currentPage"
          :totalPage="totalPages"
        ></PageComponent> -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue'
// import PageComponent from './PageComponent.vue'
import CategoryFilter from './CategoryFilter.vue'
import PriceSorting from './PriceSorting.vue'
import { searchProduct } from '@/hooks/product'
import { onMounted, watch, ref, computed } from 'vue'
import { useApiStore } from '@/stores/product'
import { storeToRefs } from 'pinia'

const filteredData = ref(null)
const searchText = ref('')
let currentPage = ref(1)
const suggestions = ref([])
const showSuggestions = ref(false)
const showFilter = ref(false)
const showCategories = ref(false)
const store = useApiStore()
const { products, isLoading, isError, sorting } = storeToRefs(store)

const closeOptions = () => {
  console.log('Closing')
  showFilter.value = false
  showSuggestions.value = false
  showCategories.value = false
}

const onSearch = async () => {
  filteredData.value = await searchProduct(products.value, searchText.value)
}

const suggestFn = async () => {
  suggestions.value = products.value
    .filter((product) => product.title.toLowerCase().includes(searchText.value.toLowerCase()))
    .sort(
      (a, b) =>
        b.title.toLowerCase().indexOf(searchText.value.toLowerCase()) -
        a.title.toLowerCase().indexOf(searchText.value.toLowerCase())
    )
  showSuggestions.value = true
}

onMounted(async () => {
  store.fetchProducts()
  paginateData()
})

watch(currentPage, () => {
  paginateData()
})
watch(products, () => {
  paginateData()
  changePage()
})
watch(searchText, () => {
  if (searchText.value == '') {
    suggestions.value = []
  }
})
watch(sorting, () => {
  if (sorting.value !== '') {
    if (sorting.value.toLowerCase() !== 'price asc') {
      filteredData.value = filteredData.value.sort((a, b) => b.price - a.price)
    } else if (sorting.value.toLowerCase() !== 'price desc') {
      filteredData.value = filteredData.value.sort((a, b) => a.price - b.price)
    }
  }
})

const paginateData = () => {
  // const startIndex = (currentPage.value - 1) * 8
  // const newData = products.value.slice(startIndex, startIndex + 8)
  filteredData.value = products.value
}

const totalPages = computed(() => {
  return Math.ceil(products.value.length / 8)
})
const changePage = (page) => {
  currentPage.value = page
}
</script>
