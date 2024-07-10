<template>
  <UiTitle
    icon="mdi mdi-view-dashboard-outline"
    title="Dashboard"
    :breadcrumb="[
      { label: 'Dashboard', to: `/${route.params.siteId}` }
    ]"
    />
  <div v-if="site" class="container mx-auto py-3">
    <div class="grid grid-cols-3 gap-2">
      <UiCard class="mb-2">
        <NuxtLink :to="`/${site.id}`" class="text-xl">
          {{ site.name }}
        </NuxtLink>
        <p class="text-sm text-zinc-600">
          {{ site.description }}<br>
          <i class="mdi mdi-calendar-blank-outline"></i> {{ site.updatedAt }}
        </p>
      </UiCard>
      <UiCard class="mb-2 col-span-2">
        <h3 class="text-lg border-b mb-2">Moderate comments</h3>
        <div v-if="Number(lastComments?.meta?.total) > 0" v-for="comment in lastComments?.data" :key="comment.id">
          <SitePostCommentsCard :comment="comment" :post="comment.post" class="mb-2" />
        </div>
        <div v-else>
          <p class="text-center text-zinc-600">
            There are no comments pending moderation
          </p>
        </div>
      </UiCard>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const { data:site } = await useFetch<Site>(`/api/appi/drodmin/${route.params.siteId}`)
const { data:lastComments } = await useFetch<Pagination<Comment[]>>(`/api/appi/drodmin/${route.params.siteId}/posts/comments`)
</script>