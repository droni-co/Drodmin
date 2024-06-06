<template>
  <UiTitle
    icon="mdi mdi-view-dashboard-outline"
    title="Dashboard"
    :breadcrumb="[
      { label: 'Dashboard', to: `/${route.params.siteId}` }
    ]"
    />
</template>
<script setup lang="ts">
const route = useRoute()
</script>