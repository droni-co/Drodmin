<template>
  <NuxtLink
    :to="`/${site.id}`"
    class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-zinc-100 rounded-lg">
    <span class="font-medium text-zinc-600">
      {{ site.name.charAt(0) }}
    </span>
  </NuxtLink>
  <ul>
    <li>
      <NuxtLink
        :to="`/${route.params.siteId}/posts`"
        class="my-1 text-zinc-100 block p-2 border border-zinc-100 hover:bg-zinc-200 hover:text-zinc-800 rounded transition">
        <i class="mdi mdi-note-multiple-outline"></i>
      </NuxtLink>
    </li>
  </ul>
</template>
<script setup lang="ts">
const route = useRoute()
const { data:site } = await useFetch<Site>(`/api/appi/drodmin/${route.params.siteId}`)
</script>