<template>
  <UiModal label="Create Post">
    <form @submit.prevent="createPost">
      <label for="name" class="text-sm">Name</label>
      <UiFormInput class="mb-3" id="name" v-model="newPost.name" placeholder="Name" required />
      
      <UiFormInput class="text-sm mb-3" v-model="newPost.slug" placeholder="Slug" required size="s"/>
      <UiButton type="submit">Create</UiButton>
    </form>
  </UiModal>
</template>
<script setup lang="ts">
const route = useRoute()
const newPost = ref<Post>({
  name: '',
  slug: '',
  format: 'markdown',
  active: false,
  lang: 'es'
})

const createPost = async () => {
  await $fetch<Post>(`/api/appi/drodmin/${route.params.siteId}/posts`, { method: 'POST', body: newPost.value}).then((data) => {
    navigateTo(`/${route.params.siteId}/posts/${data.id}`)
  })

}
</script>