<template>
  <UiTitle
    icon="mdi mdi-home-assistant"
    title="Drodmin"
    :breadcrumb="[]"
    />
  <div class="container mx-auto">
    <h1>Sitios</h1>
    <div class="grid grid-cols-4">
        <div class="col-span-1">
          <div v-for="enrollment in me!.enrollments" :key="enrollment.id" class="mb-2">
            <NuxtLink :to="`/${enrollment.site.id}`" class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-zinc-100">
              <span class="font-medium text-zinc-600">
                {{ enrollment.site.name.charAt(0) }}
              </span>
            </NuxtLink>
          </div>
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { data:me } = await useFetch<Me>('/api/appi/me')
</script>