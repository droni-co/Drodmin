<template>
  <div class="p-3">
    <h4>{{ category.name }}</h4>
    <small>
      {{  category.description }}
    </small>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  category: {
    type: Object as PropType<Category>,
    required: true
  }
})
</script>