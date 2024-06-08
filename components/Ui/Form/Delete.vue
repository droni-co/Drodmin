<template>
  <button type="button"
    class="transition"
    :class="{
      'opacity-100 text-red-500 cursor-pointer': confirmed,
      'opacity-50 cursor-help': !confirmed
    }"
    @click="waitToConfirm">
    <slot />
  </button>
</template>
<script setup lang="ts">
const confirmed = ref(false)
const emits = defineEmits(['confirmed'])
const waitToConfirm = () => {
  if (confirmed.value) {
    emits('confirmed')
  } else {
    setTimeout(() => {
      confirmed.value = true
    }, 1000)
    setTimeout(() => {
      confirmed.value = false
    }, 3000)
  }
}
</script>