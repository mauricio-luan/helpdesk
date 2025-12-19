<template>
  <v-card class="pa-5 mx-5" width="70%" height="100%">
    <v-card-title class="mb-5">Novo ticket</v-card-title>

    <v-form @submit.prevent="submitForm()">
      <v-text-field label="Titulo" v-model="title" required />
      <v-textarea label="Conteudo" v-model="content" required rows="15" />
      <v-select label="Prioridade" v-model="priority" :items="priorities" required />

      <v-btn color="success">Criar</v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { ticketConstants } from '@/constants/constants'
import { createTicket } from '@/api/ticketService'

export default {
  name: 'TicketForm',

  data() {
    return {
      title: '',
      content: '',
      priority: null,
    }
  },

  computed: {
    ...mapGetters('auth', ['getUserId', 'getUserEmail', 'getUserIdToken']),

    priorities() {
      return Object.values(ticketConstants)
    },

    methods: {
      async submitForm() {
        try {
          const ticketPayload = {
            title: this.title,
            content: this.content,
            priority: this.priority,
            authorId: this.getUserId,
            authorEmail: this.getUserEmail,
          }

          await createTicket(this.getUserIdToken, ticketPayload)
          this.$store.commit('tickets/setUpdateTickets', true)

          alert('chamado criado!')
        } catch (error) {
          console.error(error)
        }
      },
    },
  },
}
</script>
