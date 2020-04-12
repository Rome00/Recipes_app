<template>
  <nav class="navbar is-success">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item has-text-black" :to="{ name: 'Index' }">
          Add Recipes
        </router-link>
        <div
          :class="[{ 'is-active': isActive }, 'navbar-burger burger']"
          data-target="navbarLogin"
          @click="isActive = !isActive"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarLogin" :class="[{ 'is-active': isActive }, 'navbar-menu']">
        <div class="navbar-end">
          <div class="is-flex is-vcenter">
            <span class="material-icons has-grey-text text-darken-4">
              how_to_reg
            </span>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <!-- Logged Out -->
            <template v-if="!user.loggedIn">
              <p
                class="navbar-link has-text-centered has-grey-text text-darken-4"
              >
                Log In / Sign Up
              </p>
              <div class="navbar-dropdown">
                <router-link
                  class="navbar-item if-flex is-around"
                  tag="a"
                  :to="{ name: 'signIn' }"
                >
                  <span class="icon is-small">
                    <i class="material-icons">lock</i>
                  </span>
                  Log In
                </router-link>
                <router-link
                  class="navbar-item if-flex is-around"
                  tag="a"
                  :to="{ name: 'signUp' }"
                >
                  <span class="icon is-small">
                    <i class="material-icons">person_pin</i>
                  </span>
                  <span>Register</span>
                </router-link>
              </div>
            </template>
            <!-- logged In -->
            <template v-else>
              <p
                class="navbar-link has-text-centered is-capitalized has-grey-text text-darken-4 navbar-arrow"
              >
                welcome {{ user.data.displayName }}
              </p>
              <div class="navbar-dropdown">
                <router-link
                  class="navbar-item if-flex is-start"
                  tag="a"
                  :to="{ name: 'addItem' }"
                >
                  <span class="icon is-small is-pr-1-half is-pl-1">
                    <i class="material-icons">menu_book</i>
                  </span>
                  <span>Add recipe</span>
                </router-link>
                <a class="navbar-item if-flex is-start" @click="logOut">
                  <span class="icon is-small is-pr-1-half is-pl-1">
                    <i class="material-icons">exit_to_app</i>
                  </span>
                  <span>Log Out</span>
                </a>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase/app'

export default {
  name: 'navbar',
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapGetters(['user']),
    userID() {
      if (this.user.data) {
        return this.user.data.userID
      } else {
        return 'null'
      }
    }
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: 'signIn' })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-title {
  font-size: 2em;
}
.navbar-end {
  .material-icons {
    font-size: 20px;
  }
}
.navbar-arrow::after {
  border-color: #212121 !important;
}
</style>
