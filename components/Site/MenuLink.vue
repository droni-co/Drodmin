<template>
  <NuxtLink
    :to="`/${props.siteId}/${props.path}`"
    class="my-1 text-zinc-100 block p-2 hover:bg-zinc-600 hover:text-zinc-100 transition group"
    :class="{ 'border border-zinc-400': route.path.includes(`/${props.siteId}/${props.path}`) }">
    <i :class="props.icon"></i>
    <span class="max-w-0 overflow-hidden ext-xs absolute bg-zinc-900 group-hover:max-w-48 group-hover:py-1 group-hover:px-4">
      {{ props.label }}
    </span>
  </NuxtLink>
</template>
<script setup lang="ts">
const route = useRoute()
const props = defineProps({
  siteId: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})
</script>