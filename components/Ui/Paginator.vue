<template>
  <div class="flex py-3">
    <div class="text-sm" v-if="!compact">
      Total: {{ total }} | Page: {{ page }} | Per Page: 
      <input type="number" v-model="nperPage" max="100" min="10" step="1" v-on:keyup.enter="$emit('paginate', {npage: props.page, nperPage: nperPage})" class="w-16 px-2 py-1 border border-gray-300 text-center">
    </div>
    <div class="flex-grow text-end" v-if="Math.ceil(total / perPage) > 1">
      <nav>
        <template v-for="npage in Math.ceil(total / perPage)" :key="npage">
          <div v-if="npage == Math.ceil(total / perPage) && page < Math.ceil(total / perPage) - 5"
          class="inline-block px-2 py-1">
            ...
          </div>
          <div v-if="
              (npage < page + 5 && npage > page - 5)
              || (npage === 1)
              || (npage === Math.ceil(total / perPage))"
            class="cursor-pointer inline px-2 py-1 hover:bg-gray-200"
            :class="{'bg-gray-200': npage === page}"
            @click="$emit('paginate', {npage, nperPage})"
          >
            {{ npage }}
          </div>
          <div v-if="npage == 1 && page > 6"
          class="inline-block px-2 py-1">
            ...
          </div>
        </template>
      </nav>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})
const nperPage = ref(props.perPage)
</script>
