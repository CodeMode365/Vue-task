<script setup>
import FilterBar from '@/components/Products/FilterBar.vue'
import ProductListing from '@/components/Products/ProductListing.vue'
</script>

<template>
  <div class="py-12 grid grid-cols-12 gap-4">
    <div class="border rounded-sm col-span-3">
      <FilterBar />
    </div>
    <div class="col-span-9">
      <ProductListing />
    </div>
  </div>
</template>

<style scoped></style>
