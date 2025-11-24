<template>
  <section>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <ul v-else>
      <TicketCard v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import TicketCard from './TicketCard.vue'

export default {
  components: { TicketCard },

  data() {
    return {
      loading: false,
      errorMessage: null,
    }
  },

  created() {
    if (!this.hasTickets) {
      this.getTickets()
    }
  },

  computed: {
    ...mapGetters('auth', ['getUserIdToken']),
    ...mapGetters('tickets', ['hasTickets', 'getAllTickets']),

    tickets() {
      return this.getAllTickets
    },
  },

  methods: {
    async getTickets() {
      try {
        this.errorMessage = null
        this.loading = true

        await this.$store.dispatch('tickets/fetchTickets')
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
