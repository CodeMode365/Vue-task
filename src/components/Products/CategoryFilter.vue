<script setup>
import { ref } from 'vue'
import { useApiStore } from '@/stores/product'
import { storeToRefs } from 'pinia'

const categories = ['electronics', 'jewelery', "men's clothing", "women's clothing", 'All']
const { showCategories } = defineProps({
  showCategories: Boolean
})

const store = useApiStore()
const { currentCategory } = storeToRefs(store)
</script>

<template>
  <div class="relative">
    <button
      @click="() => (showCategories = !showCategories)"
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdown"
      class="text-white bg-secondary font-medium text-sm text-center items-center px-4 py-2 rounded-md min-w-40 flex justify-between"
      type="button"
    >
      {{ currentCategory !== '' ? currentCategory : 'Categories' }}
      <svg
        class="w-2.5 h-2.5 ms-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div
      id="dropdown"
      :class="[
        'absolute mt-1 z-20 bg-gray-50 divide-y divide-gray-100 rounded-md shadow w-44',
        showCategories ? '' : 'hidden'
      ]"
    >
      <ul class="py-2 text-sm" aria-labelledby="dropdownDefaultButton">
        <li
          v-for="(cate, ind) in categories"
          :key="ind"
          :class="[
            'hover:bg-sky-200 hover:text-primary rounded-md',
            currentCategory == cate ? 'text-primary bg-sky-50' : ''
          ]"
          @click="
            () => {
              const updatedCategory = cate === 'All' ? '' : cate
              store.updateCategory(updatedCategory)
            }
          "
        >
          <a href="#" class="block px-4 py-2">{{ cate }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
