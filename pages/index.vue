<template>
  <UiTitle
    icon="mdi mdi-home-assistant"
    title="Drodmin"
    :breadcrumb="[]"
    />
  <div class="container mx-auto py-3">
    <div v-if="me" class="grid grid-cols-4 gap-2">
      <UiCard v-for="enrollment in me.enrollments" :key="enrollment.id" class="mb-2">
        <NuxtLink v-if="enrollment.role === 'admin'" :to="`/${enrollment.site.id}`" class="text-xl">
          {{ enrollment.site.name }}
        </NuxtLink>
        <a v-else :href="'//'+enrollment.site.domain" target="_blank" class="text-xl">
          <i class="mdi mdi-web"></i> {{ enrollment.site.domain }}
        </a>
        <p class="text-sm text-zinc-600">
          {{ enrollment.site.description }}<br>
          <i class="mdi mdi-account"></i> {{ enrollment.role }}<br>
          <i class="mdi mdi-calendar-blank-outline"></i> {{ enrollment.createdAt }}
        </p>
      </UiCard>
    </div>
  </div>
</template>
<script setup lang="ts">
const { data:me } = await useFetch<Me>('/api/appi/me')
</script>