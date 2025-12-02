<template>
  <v-row>
    <v-col cols="12" md="4" v-for="card in cards" :key="card.title">
      <v-card class="ma-4 pa-4 text-center" :color="card.color">
        <v-card-title>{{ card.title }}</v-card-title>
        <v-card-text class="text-h2"> {{ card.value }} </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <v-list v-else>
      <TicketCard v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
    </v-list>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import TicketCard from '@/components/TicketCard.vue'

export default {
  components: { TicketCard },

  data() {
    return {
      loading: false,
      errorMessage: null,
      cards: [
        {
          title: 'Tickets abertos',
          value: 15,
          color: 'primary',
        },
        {
          title: 'Tickets finalizado',
          value: 10,
          color: 'success',
        },
        {
          title: 'Tickets em andamento',
          value: 2,
          color: 'warning',
        },
      ],
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
