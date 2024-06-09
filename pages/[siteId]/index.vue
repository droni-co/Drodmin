<template>
  <UiTitle
    icon="mdi mdi-view-dashboard-outline"
    title="Dashboard"
    :breadcrumb="[
      { label: 'Dashboard', to: `/${route.params.siteId}` }
    ]"
    />
  <div class="container mx-auto py-3">
    <div class="grid grid-cols-3 gap-2">
      <UiCard v-if="site" class="mb-2">
        <NuxtLink :to="`/${site.id}`" class="text-xl">
          {{ site.name }}
        </NuxtLink>
        <p class="text-sm text-zinc-600">
          {{ site.description }}<br>
          <i class="mdi mdi-calendar-blank-outline"></i> {{ site.updatedAt }}
        </p>
      </UiCard>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const { data:site } = await useFetch<Site>(`/api/appi/drodmin/${route.params.siteId}`)
</script>