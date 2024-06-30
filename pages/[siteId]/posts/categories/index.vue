<template>
  <UiTitle
    class="mb-3"
    icon="mdi mdi-folder-outline"
    title="Categories"
    :breadcrumb="[
      { label: 'Dashboard', to: `/${route.params.siteId}` },
      { label: 'Posts', to: `/${route.params.siteId}/posts` },
      { label: 'Categories', to: `/${route.params.siteId}/posts/categories` }
    ]"
    >
    <SitePostCategoryCreate />
  </UiTitle>
  <div class="container mx-auto">
    <div class="flex">
      <UiFormSelect
        class="mb-3 rounded-full max-w-32 mx-3"
        v-model="filters.lang"
        :options="[
          { name: 'All', id: 'all' },
          { name: 'English', id: 'en' },
          { name: 'Spanish', id: 'es' }
        ]"
        size="s"
        @change="getCategories"
        />
    </div>
    <UiTable
      :headers="[
        { label: 'Name', name: 'name' },
        { label: 'Parent', name: 'parent' },
        { label: 'Description', name: 'description' },
        { label: 'Lang', name: 'lang' },
        { label: '', name: 'actions', classes: 'w-12'}
      ]"
      :data="Array.isArray(categories) ? categories : []"
      :meta="null"
      >
      <template #name="item">
        <strong>{{ (item as unknown as Category).name }}</strong><br>
        <small>/{{ (item as unknown as Category).slug }}</small>
      </template>
      <template #parent="item">
        <strong>{{ (item as unknown as Category).parent?.name }}</strong><br>
        <small>/{{ (item as unknown as Category).parent?.slug }}</small>
      </template>
      <template #description="item">
        <a v-if="(item as unknown as Category).image" :href="String((item as unknown as Category).image)" target="_blank">
          <i class="mdi mdi-image-outline"></i>
          {{ (item as unknown as Category).image?.split('/').pop() }}
        </a>
        <p class="text-xs">
          {{ (item as unknown as Category).description }}
        </p>
      </template>
      <template #actions="item">
        <SitePostCategoryUpdate :passCategory="(item as unknown as Category)" />
      </template>
    </UiTable>
  </div>
</template>
<script setup lang="ts">

const route = useRoute()
const filters = ref({ lang: 'all' })
const categories = ref(
  (await useFetch<Category[]>(`/api/appi/drodmin/${route.params.siteId}/categories?lang=${filters.value.lang}`)).data.value
  ?? { data: []}
)
const getCategories = async () => {
  const data = await $fetch<Category[]>(`/api/appi/drodmin/${route.params.siteId}/categories?lang=${filters.value.lang}`)
  categories.value = data ?? { data: []}  
}


</script>