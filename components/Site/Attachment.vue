<template>
  <UiModal label="Attachment">
    <label for="name" class="text-sm">Name</label>
    <UiFormInput class="mb-3" id="name" v-model="name" placeholder="Name" required />
    <div class="grid grid-cols-3 gap-3">
      <div v-for="attachment in attachments.data" :key="attachment.id" class="bg-zinc-100 p-3 rounded">
        <img :src="attachment.path" class="w-full h-32 object-cover rounded" :alt="attachment.name">
        <div class="flex justify-between">
          <span>{{ attachment.name }}</span>
          <i class="mdi mdi-delete"></i>
        </div>
      </div>
    </div>
  </UiModal>
</template>
<script setup lang="ts">
const route = useRoute()
const name = ref('')
const filters = ref({ page: 1, limit: 20 })
const attachments = ref(
  (await useFetch<Pagination<Attachment[]>>(`/api/appi/drodmin/${route.params.siteId}/attachments?limit=${filters.value.limit}&page=${filters.value.page}`)).data.value
  ?? { data: []}
)
const getAttachments = async ({npage=1, nperPage=20}) => {
  filters.value = { limit: nperPage, page: npage }
  const data = await $fetch<Pagination<Attachment[]>>(`/api/appi/drodmin/${route.params.siteId}/attachments?limit=${filters.value.limit}&page=${filters.value.page}`)
    attachments.value = data ?? { data: []}  
}

// const createPost = async () => {
//   await $fetch<Post>(`/api/appi/drodmin/${route.params.siteId}/posts`, { method: 'POST', body: newPost.value}).then((data) => {
//     navigateTo(`/${route.params.siteId}/posts/${data.id}`)
//   })
// }
</script>