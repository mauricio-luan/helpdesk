import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store/store'

import TheHome from '@/pages/TheHome.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'home',
    },
    {
      path: '/home',
      name: 'home',
      component: TheHome,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/pages/TheDashboard.vue'),
        },
        {
          path: 'newticket',
          name: 'newticket',
          component: () => import('@/pages/TicketForm.vue'),
        },
        {
          path: 'ticket/:id',
          name: 'ticket-detail',
          component: () => import('@/pages/TicketDetail.vue'),
        },
        {
          path: 'edit/:id',
          name: 'edit-ticket',
          component: () => import('@/pages/TicketEdit.vue'),
        },
        {
          path: 'history/:ticketId',
          name: 'ticket-history',
          component: () => import('@/pages/TicketHistory.vue'),
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/layout/AuthLayout.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/components/LoginForm.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/pages/TheAuth.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isLogged = store.getters['auth/isLogged']
  // const logged = localStorage.getItem('isLogged')

  if (to.name === 'login' && isLogged) {
    next({ name: 'dashboard' })
  } else if (to.meta.requiresAuth && !isLogged) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
