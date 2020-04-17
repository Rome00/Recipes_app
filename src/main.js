import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

//Vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

//bulma
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)

//animated css
require('vue2-animate/dist/vue2-animate.min.css')

import '@/assets/Sass/main.scss'

// global filter for Shorten
Vue.filter('shortText', (val, lengt) => {
  if (!val || typeof val !== 'string') return ''
  if (val.length > lengt) {
    val = val.slice(0, lengt)
    return val + '...'
  } else {
    return val
  }
})

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyAmHCX3B-jqugkVj2TzheUM33gjcIDizzQ',
  authDomain: 'add-remove-app.firebaseapp.com',
  databaseURL: 'https://add-remove-app.firebaseio.com',
  projectId: 'add-remove-app',
  storageBucket: 'add-remove-app.appspot.com',
  messagingSenderId: '830644066586',
  appId: '1:830644066586:web:fe10f4868811ed4a7574a3',
  measurementId: 'G-M19HB061E5'
}

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(user => {
  store.dispatch('fetchUser', user)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
