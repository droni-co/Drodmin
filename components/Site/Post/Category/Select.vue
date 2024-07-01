<template>
  <div>
    <UiFormButton
      class="w-full block"
      @click="drawer = !drawer"
      outline
      size="s">
      <i class="mdi mdi-folder-outline"></i>
      Categories: {{ localCategories.length }}
    </UiFormButton>
    <!-- Start Drawer -->
    <div v-if="drawer"
      class="fixed inset-0 bg-black bg-opacity-50 z-10"
      v-on:keydown.esc="drawer = !drawer" tabindex="-1">
      <div class="bg-white p-2 w-1/4 ms-auto h-full shadow-lg  overflow-auto">
        <div class="flex border-b">
          <h2 class="grow">
            Categories
            <small>
              ({{ post.lang }})
            </small>
          </h2>
          <button @click="drawer = !drawer">
            <i class="mdi mdi-close"></i>
          </button>
        </div>
        <div class="my-2 border-b-1 pb-3">
          <div v-for="category in allCategories" :key="category.id">
            <SitePostCategoryCard
              :category="category"
              :class="{ 'selected': localCategories.includes(category)}"
            />
            <div v-for="subCategory in category.children" :key="subCategory.id" class="pl-3">
              <SitePostCategoryCard
                :category="subCategory"
                :class="{ 'selected': localCategories.find(p => p.id === subCategory.id) }"
                class="hover:bg-gray-100 cursor-pointer p-3"
                @click="localCategories.find(p => p.id === subCategory.id) ? removeCat(subCategory) : localCategories.push(subCategory)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const toast = useState<Toast>('toast')
const route = useRoute()
const props = defineProps({
  modelValue: {
    type: Array as PropType<Category[]>,
    default: []
  },
  post: {
    type: Object as PropType<Post>,
    required: true
  }

})
const { data:allCategories } = await useFetch<Category[]>(`/api/appi/drodmin/${route.params.siteId}/categories?parentId=0&lang=${props.post.lang}`)
const localCategories = ref<Category[]>(Array.isArray(props.modelValue) ? props.modelValue : [])
const emits = defineEmits(['update:modelValue'])
const drawer = ref(false)

const removeCat = (category: Category) => {
  localCategories.value = localCategories.value.filter(p => p.id !== category.id)
  emits('update:modelValue', localCategories.value)
}
</script>
<style scoped>
.selected {
  background-color: #f0f0f0;
  border-left: 3px solid #3490dc;
}
</style>