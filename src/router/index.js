import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import Index from '@/views/Index.vue'
import addItem from '@/components/addItem.vue'
import signIn from '@/components/signIn.vue'
import signUp from '@/components/signUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    beforeEnter: (to, from, next) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next()
        } else {
          next('/Log-in')
        }
      })
    }
  },
  {
    path: '/addItem',
    name: 'addItem',
    component: addItem,
    beforeEnter: (to, from, next) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next()
        } else {
          next('/Log-in')
        }
      })
    }
  },
  {
    path: '/Log-in',
    name: 'signIn',
    component: signIn
  },
  {
    path: '/Register',
    name: 'signUp',
    component: signUp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
