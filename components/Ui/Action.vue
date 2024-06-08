<template>
  <div
    class="text-center rounded hover:bg-zinc-900 transition hover:shadow-lg"
    :class="{
      'p-1 text-sm': props.size === 's',
      'p-2 text-base': props.size === 'm',
      'p-3 text-lg': props.size === 'l',
      'border border-zinc-800 text-zinc-800 hover:text-white': props.outline,
      'bg-zinc-800 text-white': !props.outline
    }"
    >
    <slot />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  size: {
    type: String as () => 's' | 'm' | 'l',
    default: 'm'
  },
  outline: {
    type: Boolean,
    default: false
  }
})
</script>