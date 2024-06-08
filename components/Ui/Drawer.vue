<template>
  
  <UiFormButton @click="modal = !modal">
    {{ label }}
  </UiFormButton>
  <div v-if="modal" class="fixed inset-0 bg-black bg-opacity-50 z-10">
    <div class="bg-white p-2 w-1/4 ms-auto h-full shadow-lg  overflow-auto">
      <div class="flex border-b">
        <h2 class="grow">{{ props.label }}</h2>
        <button @click="modal = !modal">
          <i class="mdi mdi-close"></i>
        </button>
      </div>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const modal = ref(false)
const props = defineProps({
  label: {
    type: String,
    required: true
  },
})
</script>