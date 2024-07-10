<template>
  <!-- Comment Card-->
  <div class="p-2 border rounded">
    <div class="card-body">
      <div
        class="d-flex justify-content-between"
        :class="{'text-slate-500': !comment.approved }"
        >
        <UiChip>{{ formatDate(comment.createdAt) }}</UiChip>
        <UiChip>{{ comment.user.name }}</UiChip>
        <UiFormButton v-if="!comment.approved" @click="aproveComment(comment)" outline size="s">
          <i class="mdi mdi-check"></i>
        </UiFormButton>
        <p class="card-text text-sm">
          <i class="text-slate-800">{{  post.name }}</i><br>
          {{ comment.content }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const toast = useState<Toast>('toast')
const props = defineProps({
  comment: {
    type: Object as PropType<Comment>,
    required: true
  },
  post: {
    type: Object as PropType<Post>,
    required: true
  }
})

const aproveComment = async (comment:Comment) => {
  comment.approved = true
  $fetch(`/api/appi/drodmin/${props.post.siteId}/posts/${props.post.id}/comments/${comment.id}`, {
    method: 'PUT',
    body: JSON.stringify(comment)
  }).then(() => {
    toast.value = { active: true, type: 'success' , message: 'Copied to clipboard' }
  }).catch(() => {
    toast.value = { active: true, type: 'error' , message: 'Error' }
  })
}
const formatDate = (date: string) => {
  return new Date(date).toLocaleString()
}
</script>