import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store/store'

import TheHome from '@/pages/TheHome.vue'
import TheAuth from '@/pages/TheAuth.vue'

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
          path: 'ticket/:id',
          name: 'ticket-detail',
          component: () => import('@/pages/TicketDetail.vue'),
        },
        {
          path: 'edit/:id',
          name: 'edit-ticket',
          component: () => import('@/components/TicketEdit.vue'),
        },
        {
          path: 'history/:ticketId',
          name: 'ticket-history',
          component: () => import('@/components/TicketHistory.vue'),
        },

        /*
        Entidade: Histórico (/ticket_history/{ticketHash}/{logHash})
        action: String (ex: "criado", "assumido", "respondido")
        timestamp: Timestamp
        userEmail: String (Quem fez a ação)
        details: String (ex: "Mudou status de Aberto para Em Análise")
        */
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: TheAuth,
    },
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
  // const logged = localStorage.getItem('isLogged')

  if (to.name === 'login' && isLogged) {
    next({ name: 'dashboard' })
  } else if (to.meta.requiresAuth && !isLogged) {
    next('/login')
  } else {
    next()
  }
})

export default router
