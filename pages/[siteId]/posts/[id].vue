<template>
  <div class="flex flex-col h-full">
    <UiTitle
      icon="mdi mdi-note-multiple-outline"
      :title="post!.name"
      :breadcrumb="[
        { label: 'Dashboard', to: `/${route.params.siteId}` },
        { label: 'Posts', to: `/${route.params.siteId}/posts` },
        { label: post!.name, to: `/${route.params.siteId}/posts/${route.params.id}` }
      ]"
      />
    <div class="flex grow" v-if="post">
      <!-- <MonacoEditor v-model="post.content" :lang="post.format" :options="{ theme: 'vs-dark',  wordWrap: 'on', tabSize: 2 }" class="w-3/4" /> -->
      <div class="px-2 grow">
        <UiCard class="mb-3">
          <div class="flex justify-between text-sm mb-3 text-zinc-600">
            <span>Created:</span>
            <span>{{ new Date(post.createdAt ?? '').toLocaleString() }}</span>
          </div>
          <div class="flex justify-between text-sm mb-3 text-zinc-600">
            <span>Updated:</span>
            <span>{{ new Date(post.updatedAt ?? '').toLocaleString() }}</span>
          </div>
          <UiChip>
            <i class="mdi mdi-code-block-braces"></i> {{ post.format }}
          </UiChip>
          <UiChip>
            <i class="mdi mdi-translate-variant"></i> {{ post.lang }}
          </UiChip>
          <UiChip>
            <i class="mdi mdi-account-edit"></i> {{ post.user?.username }}
          </UiChip>
          <UiChip>
            <i class="mdi mdi-link-circle-outline"></i> /{{ post.slug }}
          </UiChip>
          <form @submit.prevent="updatePost">
            <label for="name" class="text-sm">Name</label>
            <UiFormInput class="mb-3" id="name" v-model="post.name" placeholder="Name" required />

            <label for="description" class="text-sm">Description</label>
            <UiFormTextarea id="description" class="mb-3" v-model="post.description" placeholder="Description" required />

            <img v-if="post.image" :src="post.image" class="w-full h-32 object-cover" :alt="post.name">
            <SiteAttachment v-model="post.image" class="mb-3" />

            <div class="flex mb-3">
              <SiteProps v-model="post.props" class="grow" />
              <SitePostCategorySelect v-model="post.categories" :post="post" class="grow" />
              <SitePostCommentsModerate :post="post" class="grow" />
            </div>

            <UiFormSwitch class="mb-1" v-model="post.active" label="Active" />
            <UiFormButton type="submit">Save</UiFormButton>
          </form>
        </UiCard>

        <UiFormDelete @confirmed="deletePost(post)" class="mx-auto">
          <i class="mdi mdi-trash-can-outline"></i>
          Delete
        </UiFormDelete>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const post = ref(
  (await useFetch<Post>(`/api/appi/drodmin/${route.params.siteId}/posts/${route.params.id}`)).data.value
)

const updatePost = async () => {
  await useFetch(`/api/appi/drodmin/${route.params.siteId}/posts/${route.params.id}`, {
    method: 'PUT',
    body: JSON.stringify(post.value)
  })
  navigateTo(`/${route.params.siteId}/posts`)
}

const deletePost = async (post: Post) => {
  await useFetch(`/api/appi/drodmin/${route.params.siteId}/posts/${post.id}`, {
    method: 'DELETE'
  })
  navigateTo(`/${route.params.siteId}/posts`)
}
</script>