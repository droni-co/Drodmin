<template>
  <UiButton @click="modal = !modal">Create Post</UiButton>
  <div v-if="modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
    <div class="bg-white p-4 rounded-lg">
      <button @click="modal = !modal">Close</button>
      <UiCard>
        <form @submit.prevent="createPost">
          <input v-model="newPost.name" type="text" class="w-full" placeholder="Name" required />
          <input v-model="newPost.slug" type="text" class="w-full" placeholder="Name" required />
          <UiButton>Create</UiButton>
        </form>
      </UiCard>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const modal = ref(false)
const newPost = ref<Post>({
  name: 'Post de prueba en Droni.co',
  slug: 'post-de-prueba',
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