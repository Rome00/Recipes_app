<template>
  <div class="container signIn">
    <div class="is-mt-10 is-flex is-center">
      <div class="is-50">
        <div class="box is-green lighten-1 is-raunded">
          <h2 class="title has-text-centered is-pt-1">Log In</h2>
          <form @submit.prevent @keydown.enter="logIn">
            <div class="field">
              <label class="label has-grey-text text-darken-2" for="title"
                >Enter email:</label
              >
              <p class="control has-icons-left has-icons-right">
                <input
                  class="input is-rounded"
                  type="email"
                  placeholder="name@mail.com"
                  required
                  v-model="form.email"
                />
                <span class="icon is-small is-left">
                  <i class="material-icons">alternate_email</i>
                </span>
              </p>
            </div>
            <div class="field">
              <label class="label has-grey-text text-darken-2" for="title"
                >Enter password:</label
              >
              <p class="control has-icons-left">
                <input
                  class="input is-rounded"
                  type="password"
                  placeholder="Password"
                  required
                  v-model="form.password"
                />
                <span class="icon is-small is-left">
                  <i class="material-icons">lock</i>
                </span>
              </p>
            </div>
            <p v-if="error" class="has-text-danger is-mb-0-half">
              {{ error }}
            </p>
            <div class="field submit-form is-flex is-vcenter">
              <button
                class="button is-success is-inverted is-rounded"
                @click="logIn"
              >
                Sign In
              </button>
              <p class="is-pl-0-half">
                or
                <router-link :to="{ name: 'signUp' }"
                  ><em>Register</em></router-link
                >
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'singUp',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null
    }
  },
  methods: {
    logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$router.push({
            name: 'Index',
            params: { id: data.user.uid }
          })
        })
        .catch(err => {
          this.error = err.message
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
