<template>
  <div class="md:w-1/2 mx-auto my-5 md:grid grid-cols-2">
    <div class="grow bg-zinc-900 rounded-l-lg shadow-lg">
      <img src="~/assets/img/loginRobot.webp" alt="Login" class="w-full h-full object-cover">
    </div>
    <div class="bg-zinc-100 rounded-r-lg shadow-lg py-5 px-3">
      <h1 class="text-3xl">
        Bienvenido a Drodmin
      </h1>
      <p class="text-zinc-600 mb-3">
        Drodmin es una plataforma open source para administrar proyectos de software basados en Apis de manera eficiente.
      </p>
      <div class="text-center">
        <UiFormButton @click="signIn('google')">
          Login with Google
        </UiFormButton>
      </div>
      <hr class="my-3">
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: false,
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})
const { status, data, signIn } = useAuth()
</script>