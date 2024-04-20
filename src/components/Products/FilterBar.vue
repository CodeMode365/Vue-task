<template>
  <div class="p-2">
    <h1 class="text-xl">Filter Product</h1>

    <form class="max-w-md mx-auto my-4">
      <div class="my-4 py-4 m-4">
        <h2>Category</h2>
        <div class="my-4 text-gray-700u">
          <div class="flex items-center mb-2">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              class="w-4 h-4 mx-2"
              name="default-radio"
            />
            <label for="default-radio-1">Jwellery</label>
          </div>
          <div class="flex items-center">
            <input
              checked
              id="default-radio-2"
              class="w-4 h-4 mx-2 focus:border-red-50"
              type="radio"
              value=""
              name="default-radio"
            />
            <label for="default-radio-2">Golds</label>
          </div>
          <div class="flex items-center">
            <input
              id="default-radio-2"
              class="w-4 h-4 mx-2"
              type="radio"
              value=""
              name="default-radio"
            />
            <label for="Silver">Silver</label>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
