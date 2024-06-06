<template>
  <div class="container mx-auto">
    <h1>Posts</h1>
    <UiCard>
      <form @submit.prevent="createPost">
        <input v-model="newPost.name" type="text" class="w-full" placeholder="Name" required />
        <input v-model="newPost.slug" type="text" class="w-full" placeholder="Name" required />
        <UiButton>Create</UiButton>
      </form>
    </UiCard>
    <div class="grid grid-cols-4">
      <pre>
        {{ posts }} ---
      </pre>
      ssss
      {{ newPost }}
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const { data:posts } = await useFetch<Pagination<Post[]>>(`/api/appi/drodmin/${route.params.siteId}/posts`)
const newPost = ref<Post>({
  name: 'Post de prueba en Droni.co',
  slug: 'post-de-prueba',
  format: 'markdown',
  active: false,
  lang: 'es'
})

const createPost = async () => {
  await useFetch<Pagination<Post[]>>(`/api/appi/drodmin/${route.params.siteId}/posts`, { method: 'POST', body: newPost.value}).then((res) => {
    newPost.value = {
      name: '',
      slug: '',
      format: 'markdown',
      active: false,
      lang: 'es'  
    }
    console.log(res)
  })
}
</script>