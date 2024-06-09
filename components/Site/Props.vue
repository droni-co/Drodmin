<template>
  <div>
    <UiFormButton
      class="w-full block"
      @click="drawer = !drawer"
      outline
      size="s">
      <i class="mdi mdi-code-block-braces"></i>
      Properties ({{ localProps.length }})
    </UiFormButton>
    <!-- Start Drawer -->
    <div v-if="drawer"
      class="fixed inset-0 bg-black bg-opacity-50 z-10"
      v-on:keydown.esc="drawer = !drawer" tabindex="-1">
      <div class="bg-white p-2 w-1/4 ms-auto h-full shadow-lg  overflow-auto">
        <div class="flex border-b">
          <h2 class="grow">Properties</h2>
          <button @click="drawer = !drawer">
            <i class="mdi mdi-close"></i>
          </button>
        </div>
        <div class="my-2 border-b-1 pb-3">
          <UiFormInput
            v-model="newProp.name"
            label="Name"
            placeholder="Name"
            class="w-full"
            size="s"
            datalist="europe-countries"
            v-on:keydown.enter.prevent="createProp"
          />
          <datalist id="europe-countries">
            <option v-for="dataItem in dataList">{{ dataItem }}</option>
          </datalist>
           <UiFormTextarea
            v-model="newProp.value"
            label="Value"
            placeholder="Value"
            class="w-full"
            size="s"
          />
          <UiFormButton
            @click="createProp"
            class="w-full"
            size="s"
            outline>
            <i class="mdi mdi-plus"></i> Add new property
          </UiFormButton>
          <hr class="my-2 border-zinc-400">
          <div v-for="localProp in localProps" :key="localProp.name" class="mb-1 p-1 border-l-2 border-zinc-400 hover:bg-zinc-100 shadow">
            <div class="text-sm flex">
              <strong class="grow">
                {{ localProp.name }}
              </strong>
              <UiFormDelete @confirmed="removeProp(localProp)" class="mx-auto">
                <i class="mdi mdi-trash-can-outline"></i>
              </UiFormDelete>
            </div>
            <p class="text-xs text-zinc-600">{{ localProp.value }}</p>
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
    type: Array as PropType<Prop[]>,
    default: []
  }
})
const { data:dataList } = await useFetch<string[]>(`/api/appi/drodmin/${route.params.siteId}/posts/props`)
const localProps = ref(Array.isArray(props.modelValue) ? props.modelValue : [])
const emits = defineEmits(['update:modelValue'])
const drawer = ref(false)
const newProp = ref<Prop>({ name: '', value: '' })

const createProp = () => {
  localProps.value.unshift(newProp.value)
  newProp.value = { name: '', value: '' }
  emits('update:modelValue', localProps.value)
}
const removeProp = (prop: Prop) => {
  localProps.value = localProps.value.filter(p => p !== prop)
  emits('update:modelValue', localProps.value)
}


</script>