<template>
  <div>
    <span>{{ item.title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
