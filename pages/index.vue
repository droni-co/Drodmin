<template>
  <h1>Home Page</h1>
 {{  me }}
</template>
<script setup lang="ts">
const { data:me } = await useFetch('/api/appi/me')
</script>