<template>
  <div id="app">
    <Nav />
    <transition
      enter-active-class="animated lightSpeedIn"
      leave-active-class="animated fadeOutLeft"
      mode="out-in"
      :duration="1000"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
export default {
  name: 'app',
  components: {
    Nav
  }
}
</script>

<style lang="scss">
.time label {
  color: #616161 !important;
}
body {
  min-height: 100vh;
}
.card {
  border-radius: 10px;
}
</style>
