<template>
  <UiDrawer label="Attachments">
    <div class="my-2 border-b-1 pb-3">
      <UiFormInput class="mb-2" v-model="name" placeholder="Name for attachment" size="s" />
      <label for="file">
        <UiAction type="button" class="w-full" outline size="s">
          <i class="mdi mdi-cloud-upload-outline"></i>
          Select file
        </UiAction>
        <input id="file" type="file" class="hidden" @change="createAttachment($event)" />
      </label>
    </div>


    <div v-for="attachment in attachments.data" :key="attachment.id" class="bg-zinc-100 p-2 rounded mb-3">
      <div
        class="cursor-pointer border"
        :class="{ 'bg-zinc-200 border-teal-300': copied === attachment.id}"
        @click="select(attachment)">
        <img :src="attachment.url" class="w-full h-32 object-cover rounded" :alt="attachment.name">
        <button
          type="button"
          class="w-full border bg-white text-sm p-1 text-zinc-400 truncate transition"
          :class="{ 'bg-zinc-200': copied === attachment.id}"
          readonly
          >
          <i class="mdi mdi-content-copy"></i>
          {{ attachment.url }}
        </button>
      </div>
      <div class="flex justify-between">
        <span class="grow text-sm text-zinc-700 p-1">{{ attachment.name }}</span>
        <UiFormDelete @confirmed="deleteAttachment(attachment)" class="mx-auto">
          <i class="mdi mdi-trash-can-outline"></i>
        </UiFormDelete>
      </div>
    </div>
    <UiPaginator
      :total="attachments?.meta?.total ?? 0"
      :perPage="filters.limit"
      :page="filters.page"
      :compact="true"
      @paginate="getAttachments"
      />
  </UiDrawer>
</template>
<script setup lang="ts">
const route = useRoute()
const name = ref('')
const file = ref<File | null>();
const copied = ref(0)
const filters = ref({ page: 1, limit: 10 })
const attachments = ref(
  (await useFetch<Pagination<Attachment[]>>(`/api/appi/drodmin/${route.params.siteId}/attachments?limit=${filters.value.limit}&page=${filters.value.page}`)).data.value
  ?? { data: []}
)
const getAttachments = async ({npage=1, nperPage=20}) => {
  filters.value = { limit: nperPage, page: npage }
  const data = await $fetch<Pagination<Attachment[]>>(`/api/appi/drodmin/${route.params.siteId}/attachments?limit=${filters.value.limit}&page=${filters.value.page}`)
    attachments.value = data ?? { data: []}  
}

const select = (attachment: Attachment) => {
  navigator.clipboard.writeText(attachment.url)
  copied.value = attachment.id
}

const createAttachment = async ($event: Event) => {
  // convert file to base64
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    file.value = target.files[0];
  }
  const formData = new FormData();
  formData.append('file', file.value as File);
  formData.append('name', name.value.length > 0 ? name.value : (formData.get('file') as File).name);
  formData.append('endpoint', `/drodmin/${route.params.siteId}/attachments`);

  await $fetch<Attachment>(`/api/appi/upload`, {
    method: 'POST',
    body: formData
  }).then((data) => {
    attachments.value.data.unshift(data)
    //getAttachments({npage: filters.value.page, nperPage: filters.value.limit})
  })
}
const deleteAttachment = async (attachment: Attachment) => {
  await $fetch<Attachment>(`/api/appi/drodmin/${route.params.siteId}/attachments/${attachment.id}`, { method: 'DELETE'}).then((data) => {
    getAttachments({npage: filters.value.page, nperPage: filters.value.limit})
  })
}

</script>