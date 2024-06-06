<template>
  <UiTitle
    icon="mdi mdi-note-multiple-outline"
    title="Posts"
    :breadcrumb="[
      { label: 'Site', to: `/${route.params.siteId}` },
      { label: 'Posts', to: `/${route.params.siteId}/posts` }
    ]"
    >
    <UiButton @click="getPosts">Refresh</UiButton>
  </UiTitle>
  <div class="container mx-auto">
    <UiCard>
      <form @submit.prevent="createPost">
        <input v-model="newPost.name" type="text" class="w-full" placeholder="Name" required />
        <input v-model="newPost.slug" type="text" class="w-full" placeholder="Name" required />
        <UiButton>Create</UiButton>
      </form>
    </UiCard>
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
const filters = ref({ page: 1, limit: 5 })
const posts = ref(
  (await useFetch<Pagination<Post[]>>(`/api/appi/drodmin/${route.params.siteId}/posts?limit=${filters.value.limit}&page=${filters.value.page}`)).data.value
  ?? { data: []}
)
const getPosts = async ({npage=1, nperPage=5}) => {
  filters.value = { limit: nperPage, page: npage }
  const data = await $fetch<Pagination<Post[]>>(`/api/appi/drodmin/${route.params.siteId}/posts?limit=${filters.value.limit}&page=${filters.value.page}`)
  posts.value = data ?? { data: []}  
}



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
  })
}
</script>