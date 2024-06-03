<template>
  <div class="flex h-screen overflow-hidden">
    <!-- ===== Sidebar Start ===== -->
    <UiSidebar />
    <!-- ===== Sidebar End ===== -->

    <!-- ===== Content Area Start ===== -->
    <div
      class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
    >
      <!-- ===== Header Start ===== -->
      <h1>HEader</h1>
      <!-- ===== Header End ===== -->

      <!-- ===== Main Content Start ===== -->
      <main>
        <slot />
      </main>
      <!-- ===== Main Content End ===== -->
    </div>
    <!-- ===== Content Area End ===== -->
  </div>
</template>