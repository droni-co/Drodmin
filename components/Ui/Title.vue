<template>
  <div class="bg-zinc-700 py-3 shadow-lg mb-3">
    <div class="container mx-auto flex">
      <div class="grow">
        <h1 class="text-2xl text-white">
          <i v-if="icon" :class="icon"></i>
          {{ title }}
        </h1>
        <!-- Breadcrumb -->
        <nav class="text-sm text-gray-400">
          <NuxtLink to="/" class="hover:text-white">Home</NuxtLink>
          <template v-for="(item, index) in breadcrumb">
            <span class="mx-2">/</span>
            <NuxtLink :to="item.to" class="hover:text-white">{{ item.label }}</NuxtLink>
          </template>
        </nav>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Breadcrumb {
  label: string
  to: string
}
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  breadcrumb: {
    type: Array<Breadcrumb>,
    default: () => []
  }
})
</script>