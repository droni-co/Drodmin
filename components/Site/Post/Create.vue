<template>
  <UiDrawer label="Create Post">
    <form @submit.prevent="createPost">
      <label for="name" class="text-sm">Name</label>
      <UiFormInput class="mb-3" id="name" v-model="newPost.name" placeholder="Name" required v-on:input="createSlug" />
      <UiFormInput class="text-sm mb-3" v-model="newPost.slug" placeholder="Slug" required size="s"/>
      <UiFormSelect
        class="mb-3"
        v-model="newPost.format"
        :options="[ { name: 'Markdown', id: 'markdown' }, { name: 'HTML', id: 'html' } ]"
        size="s"
        />
      <UiFormSelect
        class="mb-3"
        v-model="newPost.lang"
        :options="[
          { name: 'English', id: 'en' },
          { name: 'Spanish', id: 'es' }
        ]"
        size="s"
        />
      <UiFormSwitch class="mb-1" v-model="newPost.active" label="Active" />
      <SiteProps v-model="newPost.props" class="mb-3" />
      <UiFormButton type="submit">Create</UiFormButton>
    </form>
  </UiDrawer>
</template>
<script setup lang="ts">
const route = useRoute()
const newPost = ref<Post>({
  name: '',
  slug: '',
  format: 'markdown',
  active: false,
  lang: 'es',
  props: []
})
const createSlug = () => {
  newPost.value.slug = newPost.value.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')
}
const createPost = async () => {
  await $fetch<Post>(`/api/appi/drodmin/${route.params.siteId}/posts`, { method: 'POST', body: newPost.value}).then((data) => {
    navigateTo(`/${route.params.siteId}/posts/${data.id}`)
  })
}
</script>