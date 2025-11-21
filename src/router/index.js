import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/store'

import TheHome from '@/pages/TheHome.vue'
import TheAuth from '@/pages/TheAuth.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: 'home' },
    {
      path: '/home',
      name: 'home',
      component: TheHome,
      meta: { requiresAuth: true },
    },
    { path: '/auth', name: 'auth', component: TheAuth },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/LoginForm.vue'),
    },
    {
      path: '/newticket',
      name: 'newticket',
      component: () => import('@/components/TicketForm.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isLogged = store.getters['auth/isLogged']

  if (to.name === 'login' && isLogged) {
    next('/home')
  } else if (to.meta.requiresAuth && !isLogged) {
    next('/login')
  } else {
    next()
  }
})

export default router
