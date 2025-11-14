import { createRouter, createWebHistory } from 'vue-router'
import TheHome from '@/pages/TheHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: 'home' },
    { path: '/auth', name: 'auth', component: 'TheAuth' },
    {
      path: '/home',
      name: 'home',
      component: TheHome,
      meta: { requiresAuth: true },
      // children: [{ path: '' }],
    },
  ],
})

export default router
