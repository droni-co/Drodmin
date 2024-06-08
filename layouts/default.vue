<template>
  <div class="flex h-screen overflow-hidden">
    <UiSidebar />
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <UiToast v-if="toast.active" :toast="toast" />
      <main class="h-full">
        <slot />
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
const loading = useState('loading', () => false)
const toast = useState<Toast>('toast', () => {
  return {
    active: false,
    type: 'success',
    message: 'Bienvenido al portal de Soporte Digital'
  }
})
</script>