<template>
  <UiTitle
    class="mb-3"
    icon="mdi mdi-account-filter-outline"
    title="Leads"
    :breadcrumb="[
      { label: 'Dashboard', to: `/${route.params.siteId}` },
      { label: 'Leads', to: `/${route.params.siteId}/leads` }
    ]"
    >
  </UiTitle>
  <div class="container mx-auto"></div>
</template>
<script setup lang="ts">
const route = useRoute()
</script>