<template>
  <div class="container mx-auto">
    <h1>Edit Post</h1>
    <div class="grid grid-cols-4">
      <pre>
        {{ post }}
      </pre>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const post = ref(
  (await useFetch<Post>(`/api/appi/drodmin/${route.params.siteId}/posts/${route.params.id}`)).data.value
  ?? { data: []}
)
</script>