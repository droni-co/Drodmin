<template>
  <div class="container mx-auto">
    <h1>Sitios</h1>
    <div class="grid grid-cols-4">
        <div class="col-span-1">
          <UiCard v-for="enrollment in me!.enrollments" :key="enrollment.id">
            <h1>{{ enrollment.site.name }} </h1>
            {{ enrollment.site.description }}
          </UiCard>
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { data:me } = await useFetch<Me>('/api/appi/me')
</script>