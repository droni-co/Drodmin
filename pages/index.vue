<template>
  <h1>Home Page</h1>
  {{ respuesta }}
  dddd
</template>
<script setup lang="ts">
const { data:respuesta } = await useFetch('/api/appi/hollo')
</script>