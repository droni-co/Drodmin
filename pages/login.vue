<template>
  <div>
    <h1>Login</h1>
    <button class="bg-teal-100" @click="signIn('google')">
      Login
    </button>
    {{ status }}
    {{ data }}
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})
const { status, data, signIn } = useAuth()


</script>