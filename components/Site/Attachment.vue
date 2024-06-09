<template>
  <div class="flex">
    <UiFormInput
      :value="modelValue"
      v-model="selected"
      placeholder="Image"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    <UiFormButton
      @click="drawer = !drawer"
      outline>
      <i class="mdi mdi-folder-upload-outline"></i>
    </UiFormButton>
    <!-- Start Drawer -->
    <div
      v-if="drawer"
      class="fixed inset-0 bg-black bg-opacity-50 z-10"
      v-on:keydown.esc="drawer = !drawer" tabindex="-1">
      <div class="bg-white p-2 w-1/4 ms-auto h-full shadow-lg  overflow-auto">
        <div class="flex border-b">
          <h2 class="grow">Attachments</h2>
          <button @click="drawer = !drawer">
            <i class="mdi mdi-close"></i>
          </button>
        </div>
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
        <hr class="mb-2">
        <UiFormInput
          v-model="filters.q"
          type="search"
          placeholder="Search..."
          size="s"
          v-on:keydown.enter.prevent="getAttachments"
          />
        <div v-for="attachment in attachments.data" :key="attachment.id" class="bg-zinc-100 p-2 mb-3">
          <div
            class="cursor-pointer border"
            :class="{ 'bg-zinc-200 border-teal-300': copied === attachment.id}">
            <img :src="attachment.url" class="w-full h-32 object-cover" :alt="attachment.name">
            <div class="flex">
              <button
                type="button"
                class="w-full border bg-white text-sm p-1 text-zinc-400 truncate transition"
                :class="{ 'bg-zinc-200': copied === attachment.id}"
                @click="copy(attachment)"
                >
                <i class="mdi mdi-content-copy"></i> Copy Url
              </button>
              <button
                type="button"
                class="w-full border bg-white text-sm p-1 text-zinc-400 truncate transition"
                :class="{ 'bg-zinc-200': copied === attachment.id}"
                @click="select(attachment)"
                >
                <i class="mdi mdi-check"></i> Select
              </button>
            </div>
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
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const toast = useState<Toast>('toast')
const route = useRoute()
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['update:modelValue'])
const drawer = ref(false)
const selected = ref('')
const name = ref('')
const file = ref<File | null>();
const copied = ref(0)
const filters = ref({ page: 1, limit: 10, q: ''})
const attachments = ref(
  (await useFetch<Pagination<Attachment[]>>(`/api/appi/drodmin/${route.params.siteId}/attachments?limit=${filters.value.limit}&page=${filters.value.page}`)).data.value
  ?? { data: []}
)
const getAttachments = async ({npage=1, nperPage=20}) => {
  filters.value = { limit: nperPage, page: npage, q: filters.value.q}
  const data = await $fetch<Pagination<Attachment[]>>(`/api/appi/drodmin/${route.params.siteId}/attachments?limit=${filters.value.limit}&page=${filters.value.page}&q=${filters.value.q}`)
    attachments.value = data ?? { data: []}  
}

const select = (attachment: Attachment) => {
  //navigator.clipboard.writeText(attachment.url)
  emits('update:modelValue', attachment.url)
  drawer.value = false
  copied.value = attachment.id
}
const copy = (attachment: Attachment) => {
  navigator.clipboard.writeText(attachment.url)
  toast.value = { active: true, type: 'success' , message: 'Copied to clipboard' }
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