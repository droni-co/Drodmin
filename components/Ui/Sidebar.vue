<template>
  <div class="bg-zinc-800">
    <UiButton @click="closeSession" class="px-3">
      <i class="mdi mdi-logout"></i> Salir
    </UiButton>
  </div>
</template>
<script lang="ts" setup>
const { signOut } = useAuth()
// Close session
const closeSession = () => {
  signOut()
}
</script>