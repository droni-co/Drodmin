<template>
  <UiTitle
    icon="mdi mdi-note-multiple-outline"
    :title="post!.name"
    :breadcrumb="[
      { label: 'Dashboard', to: `/${route.params.siteId}` },
      { label: 'Posts', to: `/${route.params.siteId}/posts` },
      { label: post!.name, to: `/${route.params.siteId}/posts/${route.params.id}` }
    ]"
    />
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
)
</script>