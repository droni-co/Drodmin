<template>
  <!-- Create Category -->
  <UiDrawer label="Create Category">
    <form @submit.prevent="createCategory">
      <label for="parentId" class="text-sm">Parent</label>
      <UiFormSelect
        id="parentId"
        class="mb-3"
        v-model="newCategory.parentId"
        :options="[{ id: 0, name: 'None' }, ...parents]"
        size="s"
        />
      <label for="name" class="text-sm">Name</label>
      <UiFormInput class="mb-3" id="name" v-model="newCategory.name" placeholder="Name" required v-on:input="createSlug" />
      <UiFormInput class="text-sm mb-3" v-model="newCategory.slug" placeholder="Slug" required size="s"/>
      <label for="description" class="text-sm">Description</label>
      <UiFormTextarea id="description" class="mb-3" v-model="newCategory.description" placeholder="Description" required />
      <img v-if="newCategory.image" :src="newCategory.image" class="w-full h-32 object-cover" :alt="newCategory.name">
      <SiteAttachment v-model="newCategory.image" class="mb-3" />
      <UiFormSelect
        class="mb-3"
        v-model="newCategory.lang"
        :options="[
          { name: 'English', id: 'en' },
          { name: 'Spanish', id: 'es' }
        ]"
        size="s"
        />
      <UiFormButton type="submit">Create</UiFormButton>
    </form>
  </UiDrawer>
</template>
<script setup lang="ts">
const toast = useState<Toast>('toast')
const route = useRoute()
const newCategory = ref<Category>({
  name: '',
  slug: '',
  description: '',
  parentId: 0,
  image: '',
  lang: 'es',
  children: []
})
const createSlug = () => {
  newCategory.value.slug = newCategory.value.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')
}

const parents = (await useFetch<Category[]>(`/api/appi/drodmin/${route.params.siteId}/categories?lang=${newCategory.value.lang}`))
  .data.value?.filter(e=>e.parentId === 0) ?? []

const createCategory = async () => {
  await $fetch<Category>(`/api/appi/drodmin/${route.params.siteId}/categories`, { method: 'POST', body: newCategory.value}).then((data) => {
    toast.value = { active: true, type: 'success' , message: 'Category created' }
    reloadNuxtApp()
  })
}
</script>