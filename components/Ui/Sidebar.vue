<template>
  <div class="bg-slate-800">
    <h1>Sidebar</h1>

    <button class="bg-teal-100" @click="closeSession">
      Close session
    </button>
  </div>
</template>
<script lang="ts" setup>
const { signOut } = useAuth()
// Close session
const closeSession = () => {
  signOut()
}
</script>