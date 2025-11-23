<template>
  <section>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <!-- no futuro renderizar um card pra cada ticket inves de lista -->
    <ul v-else>
      <li v-for="ticket in tickets" :key="ticket.id">
        <router-link :to="{ name: 'ticket-detail', params: { id: ticket.id } }">
          {{ ticket.title }} || {{ ticket.priority }}
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import * as ticketService from '@/api/ticketService'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      tickets: [],
      loading: false,
      errorMessage: null,
    }
  },

  created() {
    this.getTickets()
  },

  computed: {
    ...mapGetters('auth', ['getUserIdToken']),
  },

  methods: {
    async getTickets() {
      try {
        this.errorMessage = null
        this.loading = true

        this.tickets = await ticketService.getTickets(this.getUserIdToken)
      } catch (error) {
        this.errorMessage = error
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
