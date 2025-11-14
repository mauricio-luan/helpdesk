import { createRouter, createWebHistory } from 'vue-router'
import TheHome from '@/pages/TheHome.vue'
import TheAuth from '@/pages/TheAuth.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: 'home' },
    { path: '/auth', name: 'auth', component: TheAuth },
    {
      path: '/home',
      name: 'home',
      component: TheHome,
      meta: { requiresAuth: true },
    },
  ],
})
// const isLogged = false
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && isLogged == false) {
//     console.log(to.meta.requiresAuth, isLogged)
//     next({ name: 'auth' })
//   }
// })

export default router
