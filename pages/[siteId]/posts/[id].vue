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
      <!-- <MonacoEditor v-model="post.content" :lang="post.format" :options="{ theme: 'vs-dark',  wordWrap: 'on', tabSize: 2 }" class="w-3/4" /> -->
      <div class="w-3/4"></div>
      <div class="px-2 grow">
        <UiCard class="mb-3">
          <div class="flex justify-between text-sm mb-3 text-zinc-600">
            <span>Created:</span>
            <span>{{ new Date(post.createdAt ?? '').toLocaleString() }}</span>
          </div>
          <div class="flex justify-between text-sm mb-3 text-zinc-600">
            <span>Updated:</span>
            <span>{{ new Date(post.updatedAt ?? '').toLocaleString() }}</span>
          </div>
          <div class="flex justify-between text-sm mb-3 text-zinc-600">
            <span>By:</span>
            <span>{{ post.user?.username }}</span>
          </div>
          <form @submit.prevent="updatePost">
            <label for="name" class="text-sm">Name</label>
            <UiFormInput class="mb-3" id="name" v-model="post.name" placeholder="Name" required />
            <UiFormInput class="text-sm p-1 mb-3" v-model="post.slug" placeholder="Slug" required size="s"/>

            <label for="description" class="text-sm">Description</label>
            <UiFormTextarea id="description" class="mb-3" v-model="post.description" placeholder="Description" required />

            <SiteAttachment />
             

            <UiFormSwitch class="mb-1" v-model="post.active" label="Active" />

            <label for="lang" class="text-sm">Language</label>
            <UiFormSelect id="lang" class="mb-3" v-model="post.lang" :options="[{ name: 'English', id: 'en' }, { name: 'Spanish', id: 'es' }]" />
            <UiFormButton type="submit">Save</UiFormButton>
          </form>
        </UiCard>

        <UiFormDelete @confirmed="deletePost(post)" class="mx-auto">
          <i class="mdi mdi-trash-can-outline"></i>
          Delete
        </UiFormDelete>
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

const deletePost = async (post: Post) => {
  await useFetch(`/api/appi/drodmin/${route.params.siteId}/posts/${post.id}`, {
    method: 'DELETE'
  })
  navigateTo(`/${route.params.siteId}/posts`)
}
</script>