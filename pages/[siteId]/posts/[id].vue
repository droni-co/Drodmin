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
  <div class="container mx-auto flex">
    <div class="grow px-2">
      <UiCard>
        <form @submit.prevent="updatePost">
          <label for="name" class="text-sm">Name</label>
          <UiFormInput class="mb-3" id="name" v-model="post!.name" placeholder="Name" required />
          
          <UiFormInput class="text-sm p-1 mb-3" v-model="post!.slug" placeholder="Slug" required />
          <UiButton>Save</UiButton>
        </form>
      </UiCard>
    </div>
    <div class="px-2 w-1/4">
      <UiCard>Props</UiCard>
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
  // await useFetch(`/api/appi/drodmin/${route.params.siteId}/posts/${route.params.id}`, {
  //   method: 'PUT',
  //   body: JSON.stringify(post.value)
  // })
  // router.push(`/${route.params.siteId}/posts`)
}
</script>