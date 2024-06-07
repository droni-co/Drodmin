<template>
  <div class="flex flex-col h-full">
    <UiTitle
      icon="mdi mdi-note-multiple-outline"
      :title="post!.name"
      :breadcrumb="[
        { label: 'Dashboard', to: `/${route.params.siteId}` },
        { label: 'Posts', to: `/${route.params.siteId}/posts` },
        { label: post!.name, to: `/${route.params.siteId}/posts/${route.params.id}` }
      ]"
      />
    <div class="flex grow" v-if="post">
      <MonacoEditor v-model="post.content" :lang="post.format" :options="{ theme: 'vs-dark',  wordWrap: 'on', tabSize: 2 }" class="w-3/4" />
      <div class="px-2 grow">
        <UiCard class="mb-3">
          <form @submit.prevent="updatePost">
            <label for="name" class="text-sm">Name</label>
            <UiFormInput class="mb-3" id="name" v-model="post.name" placeholder="Name" required />
            
            <UiFormInput class="text-sm p-1 mb-3" v-model="post.slug" placeholder="Slug" required />

            <UiButton>Save</UiButton>
          </form>
        </UiCard>
        <UiCard class="mb-3">Props</UiCard>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const post = ref(
  (await useFetch<Post>(`/api/appi/drodmin/${route.params.siteId}/posts/${route.params.id}`)).data.value
)

const updatePost = async () => {
  console.log(post.value)
  await useFetch(`/api/appi/drodmin/${route.params.siteId}/posts/${route.params.id}`, {
    method: 'PUT',
    body: JSON.stringify(post.value)
  })
  navigateTo(`/${route.params.siteId}/posts`)
}
</script>