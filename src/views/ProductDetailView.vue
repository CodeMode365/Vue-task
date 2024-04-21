<template>
  <section class="text-gray-600 body-font">
    <div class="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center justify-center">
      <div class="lg:max-w-md lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
        <img
          v-if="data"
          class="object-contain object-center rounded"
          alt="hero"
          :src="data.image"
        />
      </div>
      <div
        class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center max-w-[36rem]"
      >
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          {{ data?.title }}
        </h1>
        <p class="leading-relaxed w-10/12">
          {{ data?.description }}
        </p>

        <table v-if="data" class="my-4">
          <tbody>
            <tr class="my-2">
              <th>Rating:</th>
              <td class="pl-4">
                <RatingComponent :rating="data?.rating" :withCount="falb" />
              </td>
            </tr>
            <tr class="my-2">
              <th>Category:</th>
              <td class="pl-4">{{ data.category }}</td>
            </tr>
            <tr class="my-2">
              <th>Price:</th>
              <td class="pl-4">$ {{ data.price }}</td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-center" v-if="data">
          <button
            @click="addProductIntoCart(data)"
            class="inline-flex text-white bg-secondary border-0 py-2 px-6 focus:outline-none rounded text-lg"
          >
            Add to Cart
          </button>
          <!-- <button
            class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
          >
            Button
          </button> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchProductDetail } from '@/hooks/product'
import RatingComponent from '@/components/Products/RatingComponent.vue'
import { useApiStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'

const data = ref(null)
const productId = ref('')
const route = useRoute()

const store = useApiStore()
const { addToCart } = storeToRefs(store)

const addProductIntoCart = (product) => {
  store.addToCart(product)
}

onMounted(async () => {
  if (route.params && route.params.id) {
    productId.value = route.params.id
  }
  data.value = await fetchProductDetail(productId.value)
})
</script>

<style scoped></style>
