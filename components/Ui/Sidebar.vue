<template>
  <div class="bg-zinc-800 text-center py-3 px-2 flex flex-col">
    <div class="grow" v-if="route.params.siteId">
      <SiteMenu />
    </div>
    
    <UiButton @click="closeSession" class="px-3 bottom-0">
      <i class="mdi mdi-logout"></i>
    </UiButton>
  </div>
</template>
<script lang="ts" setup>
const { signOut } = useAuth()
const route = useRoute()

// Close session
const closeSession = () => {
  signOut()
}
</script>