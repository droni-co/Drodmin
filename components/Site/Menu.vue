<template>
  <NuxtLink
    v-if="site"
    :to="`/${site.id}`"
    class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-zinc-100">
    <span class="font-medium text-zinc-600">
      {{ site.name.charAt(0) }}
    </span>
  </NuxtLink>
  <ul class="relative z-10">
    <li v-for="option in options" :key="option.label">
      <SiteMenuLink
        :siteId="String(route.params.siteId)"
        :path="option.path"
        :icon="option.icon"
        :label="option.label"
        />
    </li>
  </ul>
</template>
<script setup lang="ts">
const route = useRoute()
const { data:site } = await useFetch<Site>(`/api/appi/drodmin/${route.params.siteId}`)
const options = ref([
  { label: 'Posts', icon: 'mdi mdi-newspaper', path: 'posts' },
  { label: 'Leads', icon: 'mdi mdi-account-filter-outline', path: 'leads' },
  { label: 'Store', icon: 'mdi mdi-storefront-outline', path: 'store' }
])
</script>