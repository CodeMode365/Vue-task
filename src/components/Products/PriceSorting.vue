<script setup lang="ts">
import { ref } from 'vue'
import { useApiStore } from '@/stores/product'
import { storeToRefs } from 'pinia'

const filterOptions = ['Price Asc', 'Price Desc']
const showFilter = ref(false)

const store = useApiStore()
const { sorting, updateSorting } = storeToRefs(store)
</script>

<template>
  <div class="relative">
    <button
      @click="() => (showFilter = !showFilter)"
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdown"
      class="text-white bg-secondary font-medium text-sm text-center items-center px-4 py-2 rounded-md min-w-40 flex justify-between"
      type="button"
    >
      {{ sorting !== '' ? sorting : 'Sort' }}
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
      id="sort-option-dropdown"
      :class="[
        'absolute mt-1 z-20 bg-gray-50 divide-y divide-gray-100 rounded-md shadow w-44',
        showFilter ? '' : 'hidden'
      ]"
    >
      <ul class="py-2 text-sm" aria-labelledby="dropdownDefaultButton">
        <li
          v-for="(opt, ind) in filterOptions"
          :key="ind"
          :class="[
            'hover:bg-sky-200 hover:text-primary rounded-md',
            sorting == opt ? 'text-primary bg-sky-50' : ''
          ]"
          @click="
            () => {
              store.updateSorting(opt)
            }
          "
        >
          <a href="#" class="block px-4 py-2">{{ opt }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
