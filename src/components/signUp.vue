<template>
  <div class="container signIn">
    <div class="is-mt-10 is-flex is-center">
      <div class="is-50">
        <div class="box is-indigo lighten-3 is-raunded">
          <h2 class="title has-text-centered is-pt-1">Resgister</h2>
          <!-- name field -->
          <form @submit.prevent>
            <div class="field">
              <label class="label has-grey-text text-darken-2" for="title"
                >Display Name:</label
              >
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input is-rounded is-mb-small25"
                  :class="{
                    'is-danger': $v.form.name.$error,
                    'is-success':
                      $v.form.name.required && $v.form.name.minLength
                  }"
                  type="text"
                  placeholder="Johne Smith"
                  v-model="$v.form.name.$model"
                />
                <span class="icon is-small is-left">
                  <i class="material-icons">person</i>
                </span>

                <!--ANCHOR error & success icon -->
                <Icon v-if="$v.form.name.$error" value="error" />
                <Icon
                  v-if="$v.form.name.required && $v.form.name.minLength"
                  value="check"
                />
                <!-- error & success icon -->

                <!--ANCHOR error message -->
                <div v-if="$v.form.name.$error" class="form-error">
                  <span class="has-text-danger" v-if="!$v.form.name.required"
                    >Name is required</span
                  >
                  <span class="has-text-danger" v-if="!$v.form.name.minLength"
                    >Name must have at least
                    {{ $v.form.name.$params.minLength.min }} letters.</span
                  >
                </div>
                <!--error message -->
              </div>
            </div>
            <!-- name field -->

            <!-- email field -->
            <div class="field">
              <label class="label has-grey-text text-darken-2" for="title"
                >Enter email:</label
              >
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input is-rounded is-mb-small25"
                  type="email"
                  :class="{
                    'is-danger': $v.form.email.$error,
                    'is-success': $v.form.email.required && $v.form.email.email
                  }"
                  placeholder="name@mail.com"
                  v-model="$v.form.email.$model"
                />
                <span class="icon is-small is-left">
                  <i class="material-icons">alternate_email</i>
                </span>

                <!--ANCHOR error & success icon -->
                <Icon v-if="$v.form.email.$error" value="error" />
                <Icon
                  v-if="$v.form.email.required && $v.form.email.email"
                  value="check"
                />
                <!-- error & success icon -->

                <!--ANCHOR error message -->
                <div v-if="$v.form.email.$error" class="form-error">
                  <span class="has-text-danger" v-if="!$v.form.email.required"
                    >Field is required</span
                  >
                  <span class="has-text-danger" v-if="!$v.form.email.email"
                    >The email address is badly formatted.</span
                  >
                </div>
                <!-- error message -->
              </div>
            </div>
            <!-- email field -->

            <!-- password field -->
            <div class="field">
              <label class="label has-grey-text text-darken-2" for="title"
                >Enter password:</label
              >
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input is-rounded"
                  type="password"
                  placeholder="Password"
                  :class="{
                    'is-danger': $v.form.password.$error,
                    'is-success':
                      $v.form.password.required &&
                      $v.form.password.minLength &&
                      $v.form.password.strongPassword
                  }"
                  v-model.trim="$v.form.password.$model"
                />
                <span class="icon is-small is-left">
                  <i class="material-icons">lock</i>
                </span>

                <!--ANCHOR error & success icon -->
                <Icon v-if="$v.form.password.$error" value="error" />
                <Icon
                  v-if="
                    $v.form.password.required &&
                      $v.form.password.minLength &&
                      $v.form.password.strongPassword
                  "
                  value="check"
                />
                <!-- error & success icon -->

                <!--ANCHOR error message -->
                <div class="field-error" v-if="$v.form.password.$error">
                  <span
                    class="has-text-danger"
                    v-if="!$v.form.password.required"
                    >Field is required</span
                  >
                  <span
                    class="has-text-danger"
                    v-if="!$v.form.password.minLength"
                    >Password must have at least
                    {{ $v.form.password.$params.minLength.min }} letters.</span
                  >
                  <span
                    class="has-text-danger"
                    v-if="
                      !$v.form.password.strongPassword &&
                        $v.form.password.minLength &&
                        $v.form.password.required
                    "
                    >Password must have special character</span
                  >
                </div>
                <!-- error message -->
              </div>
            </div>
            <!-- password field -->

            <!-- Re-password field -->
            <div class="field">
              <label class="label has-grey-text text-darken-2" for="title"
                >Repeat password:</label
              >
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input is-rounded"
                  :class="{
                    'is-danger': $v.form.repeatPassword.$error,
                    'is-success':
                      $v.form.repeatPassword.required &&
                      $v.form.repeatPassword.sameAsPassword
                  }"
                  type="password"
                  placeholder="Re-enter Password"
                  v-model="$v.form.repeatPassword.$model"
                />
                <span class="icon is-small is-left">
                  <i class="material-icons">lock</i>
                </span>

                <!--ANCHOR error & success icon -->
                <Icon v-if="$v.form.repeatPassword.$error" value="error" />
                <Icon
                  v-if="
                    $v.form.repeatPassword.required &&
                      $v.form.repeatPassword.sameAsPassword
                  "
                  value="check"
                />
                <!-- error & success icon -->

                <!--ANCHOR error message -->
                <div class="field-error" v-if="$v.form.repeatPassword.$error">
                  <span
                    class="has-text-danger"
                    v-if="!$v.form.repeatPassword.sameAsPassword"
                  >
                    Passwords must be identical.
                  </span>
                </div>
                <!-- error message -->
              </div>
            </div>
            <!-- Re-password field -->

            <!-- error field -->
            <p v-if="error" class="has-text-danger is-mb-0-half">
              {{ error }}
              <router-link
                :to="{ name: 'signIn' }"
                v-if="code === 'auth/email-already-in-use'"
              >
                Log in</router-link
              >
            </p>
            <div class="field submit-form is-mt-2">
              <button
                class="button is-success is-inverted is-rounded"
                @click="creatUser"
                @keydown.enter="creatUser"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import Icon from '@/components/icon.vue'
import {
  required,
  sameAs,
  minLength,
  email,
  helpers
} from 'vuelidate/lib/validators'

export default {
  name: 'singUp',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        repeatPassword: null
      },
      error: null,
      code: null
    }
  },
  components: {
    Icon
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(2)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        strongPassword(password) {
          return (
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /\W|_/.test(password)
          )
        }
      },
      repeatPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    creatUser() {
      if (!this.$v.$anyError) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(data => {
            data.user.updateProfile({
              displayName: this.form.name
            })
            this.$store.dispatch('fetchUser', data.user.displayName)
            this.$router.replace({ name: 'Index' })
          })
          .catch(err => {
            this.error = err.message
            this.code = err.code
          })
      } else {
        this.$v.form.$touch()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
