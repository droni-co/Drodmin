<template>
  <div>
    <UiFormButton
      class="w-full block"
      @click="drawer = !drawer"
      outline
      size="s">
      <i class="mdi mdi-folder-outline"></i>
      Comments: {{ comments?.length }}
    </UiFormButton>
    <!-- Start Drawer -->
    <div v-if="drawer"
      class="fixed inset-0 bg-black bg-opacity-50 z-10"
      v-on:keydown.esc="drawer = !drawer" tabindex="-1">
      <div class="bg-white p-2 w-1/4 ms-auto h-full shadow-lg  overflow-auto">
        <div class="flex border-b">
          <h2 class="grow">
            Comments
          </h2>
          <button @click="drawer = !drawer">
            <i class="mdi mdi-close"></i>
          </button>
        </div>
        <div class="my-2 border-b-1 pb-3">
          <div v-for="comment in comments" :key="comment.id">
            <SitePostCommentsCard :comment="comment" :post="comment.post" class="mb-2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const toast = useState<Toast>('toast')
const route = useRoute()
const { data:comments } = await useFetch<Comment[]>(`/api/appi/drodmin/${route.params.siteId}/posts/comments`)

const drawer = ref(false)


</script>