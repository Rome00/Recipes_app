<template>
  <footer class="footer is-black">
    <div class="content has-text-centered">
      <p>
        <strong class="has-grey-text">Recipes</strong> by
        <a href="https://github.com/Rome00">Romeo Khazalia</a>. The source code
        is licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'about',
  computed: {
    getRoute() {
      if (this.$route.name === 'signUp' || this.$route.name === 'signIn') {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  margin-top: 3rem;
  a:hover {
    color: #2e7d32;
  }
}
</style>
