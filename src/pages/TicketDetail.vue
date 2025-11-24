<template>
  <section>
    <span>
      <strong>Protocolo: </strong>
      <p>#46783</p>
    </span>

    <span>
      <strong>Titulo: </strong>
      <p>{{ getCurrentTicket.title }}</p>
    </span>

    <span>
      <strong>Descrição: </strong>
      <p>{{ getCurrentTicket.content }}</p>
    </span>

    <span>
      <strong>Prioridade: </strong>
      <p>{{ getCurrentTicket.priority }}</p>
    </span>

    <span>
      <strong>Status: </strong>
      <p>{{ getCurrentTicket.status }}</p>
    </span>

    <span>
      <strong>Criado em: </strong>
      <p>{{ getCurrentTicket.createdAt }}</p>
    </span>

    <span>
      <strong>Criado por: </strong>
      <p>{{ getCurrentTicket.authorEmail }}</p>
    </span>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async created() {
    await this.fetchTicket(this.$route.params.id)
  },

  computed: {
    ...mapGetters('tickets', ['hasTickets', 'getTicketById', 'getCurrentTicket']),
  },

  methods: {
    // Se a lista de tickets não estiver carregada (deep link / refresh), busco só o
    // ticket necessário. Mantenho o template simples usando apenas getCurrentTicket.
    async fetchTicket(ticketId) {
      try {
        if (!this.hasTickets) {
          await this.$store.dispatch('tickets/fetchTicket', ticketId)
        } else {
          this.$store.commit('tickets/setCurrentTicket', this.getTicketById(ticketId))
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
