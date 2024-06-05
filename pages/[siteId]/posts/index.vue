<template>
  <SiteMenu />
  <div class="container mx-auto">
    <h1>Posts</h1>
    <div class="grid grid-cols-4">
      <pre>
        {{ posts }} ---
      </pre>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const { data:posts } = await useFetch<Pagination<Post[]>>(`/api/appi/${route.params.siteId}/admin/posts`)
</script>