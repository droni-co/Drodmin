<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3" v-for="header in headers" :key="header.name">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in data"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            v-for="header in headers"
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ (item as Record<string, any>)[header.name] }}
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
interface Header {
  label: string
  name: string
}
const props = defineProps({
  headers: {
    type: Array<Header>,
    required: true
  },
  data: {
    type: Array<Object>,
    required: true
  }
})
</script>