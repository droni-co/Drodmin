<template>
  <UiTitle
    class="mb-3"
    icon="mdi mdi-storefront-outline"
    title="Store"
    :breadcrumb="[
      { label: 'Dashboard', to: `/${route.params.siteId}` },
      { label: 'Store', to: `/${route.params.siteId}/store` }
    ]"
    >
  </UiTitle>
  <div class="container mx-auto"></div>
</template>
<script setup lang="ts">
const route = useRoute()
</script>