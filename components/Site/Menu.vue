<template>
  <nav class="bg-zinc-100 py-3 shadow-lg">
    <div class="container mx-auto flex">
      <NuxtLink :to="`/${route.params.siteId}`"  class="text-zinc-800 grow text-2xl">
        {{ site!.name }}
      </NuxtLink>
      <ul class="flex">
        <li>
          <NuxtLink :to="`/${route.params.siteId}/posts`" class="text-zinc-800 block p-1 px-3 hover:bg-zinc-200 rounded transition">
            Posts
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup lang="ts">
const route = useRoute()
const { data:site } = await useFetch<Site>(`/api/appi/${route.params.siteId}`)
</script>