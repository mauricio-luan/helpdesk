<template>
  <v-container fluid>
    <!-- headers -->
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

    <!-- contents -->
    <v-row>
      <v-col cols="8" md="8">
        <v-card v-if="editing" class="h-auto my-5">
          <v-textarea label="Comentario" variant="solo-filled" v-model="content" />
          <v-card-actions class="justify-end mr-3">
            <v-btn size="x-small" @click="createComment()">Salvar</v-btn>
            <v-btn size="x-small" @click="editing = !editing">Cancelar</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="h-auto" :text="getCurrentTicket.content">
          <v-card-actions class="justify-end mr-3">
            <v-btn size="x-small" @click="editing = true">Responder</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="4" md="4">
        <v-card title="Propriedades">
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
import * as commentsService from '@/api/commentsService'
import { mapGetters } from 'vuex'
import { formatDate } from '@/utils/utils'

export default {
  async created() {
    await this.fetchTicket(this.$route.params.id)
    console.log(this.getTicketDetails)
  },

  data() {
    return {
      editing: false,
      content: '',
    }
  },

  computed: {
    ...mapGetters('tickets', [
      'hasTickets',
      'getTicketById',
      'getCurrentTicket',
      'getTicketDetails',
    ]),
    ...mapGetters('auth', ['getUserEmail', 'getUserIdToken']),
    ...mapGetters('comments', ['getAllComments']),
  },

  methods: {
    formatDate: formatDate,

    defineRoute(routeName, routeId) {
      this.$router.push({ name: routeName, params: { id: routeId } })
    },

    async fetchTicket(ticketId) {
      try {
        await this.$store.dispatch('tickets/initializeTicketDetails', ticketId)
      } catch (error) {
        console.error(error)
      }
    },

    async createComment() {
      try {
        const comment = {
          content: this.content,
          createdAt: new Date().toISOString(),
          createdBy: this.getUserEmail,
        }

        await commentsService.createComments(this.getUserIdToken, comment, this.getCurrentTicket.id)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
