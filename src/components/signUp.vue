<template>
  <div class="container signIn">
    <div class="is-mt-10 is-flex is-center">
      <div class="is-50">
        <div class="box is-green lighten-1 is-raunded">
          <h2 class="title has-text-centered is-pt-1">Resgister</h2>
          <div class="field">
            <label class="label has-grey-text text-darken-2" for="title"
              >Disolay Name:</label
            >
            <p class="control has-icons-left has-icons-right">
              <input
                class="input is-rounded"
                type="text"
                required
                placeholder="Johne Smith"
                v-model="form.name"
              />
              <span class="icon is-small is-left">
                <i class="material-icons">person</i>
              </span>
            </p>
          </div>
          <div class="field">
            <label class="label has-grey-text text-darken-2" for="title"
              >Enter email:</label
            >
            <p class="control has-icons-left has-icons-right">
              <input
                class="input is-rounded"
                type="email"
                required
                placeholder="name@mail.com"
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
          <div class="field is-pb-2">
            <label class="label has-grey-text text-darken-2" for="title"
              >Repeat password:</label
            >
            <p class="control has-icons-left">
              <input
                class="input is-rounded"
                type="password"
                placeholder="Re-enter Password"
                required
                v-model="subPassword"
              />
              <span class="icon is-small is-left">
                <i class="material-icons">lock</i>
              </span>
            </p>
          </div>
          <p v-if="error" class="has-text-danger is-mb-0-half">
            {{ error }}
          </p>
          <div class="field submit-form">
            <button
              class="button is-success is-inverted is-rounded"
              @click="creatUser"
              @keydown.enter="creatUser"
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'singUp',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      subPassword: null,
      error: null
    }
  },
  methods: {
    creatUser() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$router.replace({ name: 'signIn' })
        })
        .catch(err => {
          this.error = err.message
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
