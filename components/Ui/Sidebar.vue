<template>
  <div class="bg-zinc-800 text-center py-3 px-2 flex flex-col">
    <div class="grow">
      <div v-for="enrollment in me!.enrollments" :key="enrollment.id" class="mb-2">
        <NuxtLink :to="`/${enrollment.site.id}`" class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-zinc-100 rounded-lg">
          <span class="font-medium text-zinc-600">
            {{ enrollment.site.name.charAt(0) }}
          </span>
        </NuxtLink>
      </div>
    </div>
    
    
    <UiButton @click="closeSession" class="px-3 bottom-0">
      <i class="mdi mdi-logout"></i>
    </UiButton>
  </div>
</template>
<script lang="ts" setup>
const { signOut } = useAuth()
const { data:me } = await useFetch<Me>('/api/appi/me')
// Close session
const closeSession = () => {
  signOut()
}
</script>