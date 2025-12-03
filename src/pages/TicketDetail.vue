<!--

O Desafio Prático: Refinar o Card de Ticket
Vamos voltar àquele teu componente TicketCard.vue (ou a lista que estavas a fazer). Imagina um card individual de um ticket.

A Missão: Quero que desenhes a estrutura de um card simples, mas aplicando a Hierarquia correta:

Título do Ticket: Deve ser destacado, mas não gigante. Usa text-h6.

Descrição: Texto normal. Usa text-body-2 (para caber mais texto).

Rodapé (Data e Autor): Texto pequeno e discreto. Usa text-caption e uma cor mais clara (text-medium-emphasis).

Espaçamento: Quero que o título tenha uma margem inferior (mb) para não colar na descrição. Escolhe um valor da régua de 4 (ex: 8px ou 12px).

Consegues montar esse <v-card> aplicando estas classes de texto e espaçamento?-->
<template>
  <v-card> </v-card>
  <section>
    <div>
      <button
        @click="$router.push({ name: 'ticket-history', params: { ticketId: $route.params.id } })"
      >
        log de alteracoes
      </button>
    </div>
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

  <div>
    <button @click="$router.push({ name: 'edit-ticket', params: { id: getCurrentTicket.id } })">
      Editar
    </button>
  </div>
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
