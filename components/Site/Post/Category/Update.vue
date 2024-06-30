<template>
  <!-- Create Category -->
  <UiDrawer label="Edit Category" link-class="text-zinc-400 cursor-pointer">
    <form @submit.prevent="updateCategory">
      <label for="parentId" class="text-sm">Parent</label>
      <UiFormSelect
        id="parentId"
        class="mb-3"
        v-model="category.parentId"
        :options="[{ id: 0, name: 'None' }, ...parents]"
        size="s"
        />
      <label for="name" class="text-sm">Name</label>
      <UiFormInput class="mb-3" id="name" v-model="category.name" placeholder="Name" required />
      <label for="description" class="text-sm">Description</label>
      <UiFormTextarea id="description" class="mb-3" v-model="category.description" placeholder="Description" required />
      <img v-if="category.image" :src="category.image" class="w-full h-32 object-cover" :alt="category.name">
      <SiteAttachment v-model="category.image" class="mb-3" />
      <UiFormButton type="submit">update</UiFormButton>
    </form>
    <UiFormDelete @confirmed="deleteCategory(category)" class="mx-auto">
      <i class="mdi mdi-trash-can-outline"></i>
      Delete
    </UiFormDelete>
  </UiDrawer>
</template>
<script setup lang="ts">
const toast = useState<Toast>('toast')
const route = useRoute()
const props = defineProps({
  passCategory: {
    type: Object as PropType<Category>,
    required: true
  },
})
const category = ref<Category>({
  name: '',
  slug: '',
  description: '',
  parentId: 0,
  image: '',
  lang: 'es',
  children: []
})

category.value = props.passCategory
const parents = (await useFetch<Category[]>(`/api/appi/drodmin/${route.params.siteId}/categories?lang=${props.passCategory.lang}`))
  .data.value?.filter(e=>e.parentId === 0) ?? []

const updateCategory = async () => {
  await $fetch<Category>(`/api/appi/drodmin/${route.params.siteId}/categories/${category.value.id}`, { method: 'PUT', body: category.value}).then((data) => {
    toast.value = { active: true, type: 'success' , message: 'Category created' }
    reloadNuxtApp()
  })
}

const deleteCategory = async (category: Category) => {
  await $fetch(`/api/appi/drodmin/${route.params.siteId}/categories/${category.id}`, {
    method: 'DELETE'
  })
  toast.value = { active: true, type: 'success' , message: 'Category deleted' }
  reloadNuxtApp()
}
</script>