<template>
  <header class="text-gray-400 body-font border-b-[1px] border-gray-200 shadow-md px-4">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
        <svg
          id="logo-35"
          width="50"
          height="39"
          viewBox="0 0 50 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
            class="ccompli1"
            fill="#007AFF"
          ></path>
          <path
            d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
            class="ccustom"
            fill="#312ECB"
          ></path>
        </svg>
        <span class="ml-3 text-xl text-primary">Demo</span>
      </a>
      <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-gray-700 justify-center">
        <slot></slot>
      </nav>
      <button
        class="inline-flex items-center bg-secondary text-white border-0 py-1 px-3 focus:outline-none hover:bg-secondary/90 rounded text-base mt-4 md:mt-0"
      >
        Explore
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-4 h-4 ml-1"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </header>
</template>

<style>
.router-link-active {
  @apply text-primary underline;
}
</style>
