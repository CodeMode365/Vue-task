<template>
  <div class="flex items-center">
    <div class="mx-auto">
      <div class="flex flex-col items-center">
        <a href="/" class="mb-8 inline-flex items-center gap-2.5 text-4xl font-bold"> 404 Error </a>

        <p class="mb-12 max-w-screen-md text-center text-gray-500 md:text-lg">
          The page you’re looking for doesn’t exist.
        </p>

        <RouterLink
          to="/"
          class="my-4 bg-gray-200 text-primary border-primary p-2 px-4 py-2 rounded-md"
          >Go home</RouterLink
        >
      </div>
    </div>
  </div>
</template>
