<template>
  <span
    class="icon is-small is-right"
    :class="[iconVal ? 'has-text-danger' : 'has-text-success']"
  >
    <i class="material-icons">{{ value }}</i>
  </span>
</template>

<script>
export default {
  props: ['value'],
  computed: {
    iconVal() {
      return this.value == 'error' ? true : false
    }
  }
}
</script>
