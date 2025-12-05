<template>
  <v-container fluid>
    <v-row class="d-flex align-center">
      <v-col cols="8">
        <v-card-title>{{ getCurrentTicket.title }}</v-card-title>
      </v-col>

      <v-col cols="4">
        <v-card-actions class="justify-end">
          <v-btn color="success" @click="defineRoute('edit-ticket', getCurrentTicket.id)">
            Editar
          </v-btn>
          <v-btn color="primary" @click="defineRoute('ticket-history', getCurrentTicket.id)">
            Log
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8" md="8">
        <v-card>
          <v-card-title>Descrição</v-card-title>
          <v-card-text>{{ getCurrentTicket.content }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="4" md="4">
        <v-card>
          <v-card-title>Propriedades</v-card-title>

          <v-card-text>
            <v-list density="compact">
              <v-list-item title="Prioridade" :subtitle="getCurrentTicket.priority" />
              <v-list-item title="Status" :subtitle="getCurrentTicket.status" />
              <v-list-item title="Criado em" :subtitle="formatDate(getCurrentTicket.createdAt)" />
              <v-list-item title="Criado por" :subtitle="getCurrentTicket.authorEmail" />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate } from '@/utils/utils'

export default {
  async created() {
    await this.fetchTicket(this.$route.params.id)
  },

  computed: {
    ...mapGetters('tickets', ['hasTickets', 'getTicketById', 'getCurrentTicket']),
  },

  methods: {
    formatDate: formatDate,

    defineRoute(routeName, routeId) {
      this.$router.push({ name: routeName, params: { id: routeId } })
    },

    // Se a lista de tickets não estiver carregada (deep link / refresh), busco só o
    // ticket necessário. Mantenho o template simples usando apenas getCurrentTicket.
    async fetchTicket(ticketId) {
      try {
        console.log('executando fetchTicket')
        if (!this.hasTickets) {
          await this.$store.dispatch('tickets/fetchTicket', ticketId)
          console.log('nao tinha tickets no state')
        } else {
          this.$store.commit('tickets/setCurrentTicket', this.getTicketById(ticketId))
          console.log('tinha tickets no state, comitando')
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
