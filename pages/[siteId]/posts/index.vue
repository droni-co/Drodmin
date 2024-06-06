<template>
  <UiTitle
    icon="mdi mdi-note-multiple-outline"
    title="Posts"
    :breadcrumb="[
      { label: 'Dashboard', to: `/${route.params.siteId}` },
      { label: 'Posts', to: `/${route.params.siteId}/posts` }
    ]"
    >
    <SiteCreate />
  </UiTitle>
  <div class="container mx-auto">
    <UiTable
      :headers="[
        { label: 'Name', name: 'name' },
        { label: 'Format', name: 'format' },
        { label: 'Active', name: 'active' },
        { label: 'Lang', name: 'lang' },
        { label: '', name: 'actions', classes: 'w-12'}
      ]"
      :data="posts?.data ?? []"
      :meta="posts?.meta"
      >
      <template #name="item">
        <strong>{{ (item as unknown as Post).name }}</strong><br>
        <small>/{{ (item as unknown as Post).slug }}</small>
      </template>
      <template #actions="item">
        <NuxtLink :to="`/${route.params.siteId}/posts/${(item as unknown as Post).id}`" class="px-3">
          <i class="mdi mdi-pencil"></i>
        </NuxtLink>
      </template>
    </UiTable>
    <UiPaginator
      :total="posts?.meta?.total ?? 0"
      :perPage="filters.limit"
      :page="filters.page"
      @paginate="getPosts"
      />
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const filters = ref({ page: 1, limit: 20 })
const posts = ref(
  (await useFetch<Pagination<Post[]>>(`/api/appi/drodmin/${route.params.siteId}/posts?limit=${filters.value.limit}&page=${filters.value.page}`)).data.value
  ?? { data: []}
)
const getPosts = async ({npage=1, nperPage=20}) => {
  filters.value = { limit: nperPage, page: npage }
  const data = await $fetch<Pagination<Post[]>>(`/api/appi/drodmin/${route.params.siteId}/posts?limit=${filters.value.limit}&page=${filters.value.page}`)
  posts.value = data ?? { data: []}  
}
</script>