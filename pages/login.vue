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
        Drodmin es una plataforma open source para administra rproyectos de software basados en Apis que te permite gestionar tus proyectos de manera eficiente.
      </p>
      <div class="text-center">
        <button class="bg-zinc-800 text-white p-2 px-20 rounded" @click="signIn('google')">
          Login with Google
        </button>
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