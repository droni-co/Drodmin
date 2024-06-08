<template>
  <div
    class="fixed
      z-20
      end-0
      mt-3
      me-3
      flex
      items-center
      w-full
      max-w-xs
      p-4
      space-x-4
      rtl:space-x-reverse
      text-gray-500
      bg-white
      divide-x
      rtl:divide-x-reverse
      divide-gray-200
      shadow-lg
      dark:text-gray-400
      dark:divide-gray-700
      space-x
      dark:bg-gray-800
      animate__animated
      animate__fadeInDown" role="alert">
      <i v-if="toast.type === 'info'" class="mdi mdi-information text-blue-600 dark:text-blue-500"></i>
      <i v-if="toast.type === 'success'" class="mdi mdi-check text-green-600 dark:text-green-500"></i>
      <i v-if="toast.type === 'warning'" class="mdi mdi-alert text-yellow-600 dark:text-yellow-500"></i>
      <i v-if="toast.type === 'error'" class="mdi mdi-alert-circle text-red-600 dark:text-red-500"></i>
      <div class="ps-4 text-sm font-normal flex-grow">{{ toast.message }}</div>
      <button type="button" class="ps-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" @click="close">
        <i class="mdi mdi-close"></i>
      </button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  toast: {
    type: Object as PropType<Toast>,
    required: true
  }
})
const close = () => {
  props.toast.active = false
}
</script>