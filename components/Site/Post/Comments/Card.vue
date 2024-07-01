<template>
  <!-- Comment Card-->
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <div>
          <UiChip>
            {{ comment.createdAt }}
          </UiChip>
          <UiChip>
            {{ comment.user.name }}
          </UiChip>
          <p class="card-text">{{ comment.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  comment: {
    type: Object as PropType<Comment>,
    required: true
  }
})
</script>