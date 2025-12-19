<template>
  <SnackBar v-if="message" v-model:snackbar="showSnackbar" :text="message" />

  <v-container fluid>
    <!-- headers -->
    <v-row class="d-flex align-center">
      <v-col cols="8">
        <v-card-title>
          # {{ getCurrentTicket.protocol ? getCurrentTicket.protocol : 'Sem protocolo' }} -
          {{ getCurrentTicket.title }}
        </v-card-title>
      </v-col>

      <v-col cols="4">
        <v-card-actions class="justify-end">
          <v-btn color="success" @click="defineRoute('edit-ticket', getCurrentTicket.id)">
            Editar
          </v-btn>
          <v-btn color="primary" @click="defineRoute('ticket-history', getCurrentTicket.id)">
            Log
          </v-btn>
          <v-btn color="error" @click="deleteTicket()">Excluir</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>

    <!-- contents -->
    <v-row>
      <v-col cols="8" md="8">
        <v-card class="pa-3">
          <v-row class="d-flex justify-space-between my-2">
            <v-card-title>Descrição</v-card-title>

            <v-card-actions class="justify-end mr-5">
              <v-btn size="x-small" color="primary" variant="flat" @click="editing = true">
                Responder
              </v-btn>
            </v-card-actions>
          </v-row>

          <!-- new comment -->
          <v-card-text class="py-0">
            <div class="d-flex justify-end">
              <v-card v-if="editing" variant="plain" width="95%" class="mr-5">
                <v-textarea label="Comentario" variant="solo-filled" v-model="content" />

                <v-card-actions class="justify-end mr-3">
                  <v-btn size="x-small" color="error" variant="tonal" @click="editing = !editing">
                    Cancelar
                  </v-btn>
                  <v-btn
                    size="x-small"
                    color="success"
                    variant="flat"
                    @click="createComment()"
                    :loading="btnLoading"
                  >
                    Salvar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-card-text>

          <!-- comments -->
          <v-timeline align="start" side="end" density="compact">
            <v-timeline-item
              v-for="item in ticketContent"
              :key="item.id"
              :dot-color="item.id === 'root-content' ? 'warning' : 'primary'"
              :icon="item.id === 'root-content' ? 'mdi-alert-circle' : 'mdi-account'"
              width="95%"
            >
              <v-card elevation-1>
                <v-card-subtitle class="pt-2 d-flex justify-space-between">
                  <span>{{ item.createdBy }}</span>
                  <span>{{ formatDate(item.createdAt) }}</span>
                </v-card-subtitle>
                <v-card-text>{{ item.content }}</v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
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
import { mapGetters } from 'vuex'
import { createComments } from '@/api/commentsService'
import { patchTicket } from '@/api/ticketService'
import { ticketStatus } from '@/constants/constants'
import { formatDate } from '@/utils/utils'

export default {
  async created() {
    const routeId = this.$route.params.id
    const memoryId = this.getCurrentTicket?.id

    if (!memoryId || memoryId !== routeId) {
      this.$store.commit('comments/resetComments')
      // await this.fetchTicket(routeId)
    } else {
      console.log('debug: cache comments')
    }
    await this.fetchTicket(routeId)
  },

  data() {
    return {
      content: '',
      editing: false,
      btnLoading: false,
      loading: false,
      showSnackbar: false,
      message: null,
    }
  },

  computed: {
    ...mapGetters('tickets', ['getCurrentTicket', 'ticketContent']),
    ...mapGetters('auth', ['getUserEmail', 'getUserIdToken']),
  },

  methods: {
    formatDate: formatDate,

    defineRoute(routeName, routeId) {
      this.$router.push({ name: routeName, params: { id: routeId } })
    },

    async fetchTicket(ticketId) {
      try {
        this.loading = true
        this.message = null

        await this.$store.dispatch('tickets/initializeTicketDetails', ticketId)
      } catch (error) {
        this.message = error.message
      } finally {
        this.loading = false
      }
    },

    async createComment() {
      try {
        this.btnLoading = true
        this.message = null

        const comment = {
          content: this.content,
          createdAt: new Date().toISOString(),
          createdBy: this.getUserEmail,
        }

        await createComments(this.getUserIdToken, comment, this.getCurrentTicket.id)
        await this.$store.dispatch('tickets/initializeTicketDetails', this.getCurrentTicket.id)
      } catch (error) {
        this.message = error.message
        this.showSnackbar = true
      } finally {
        this.btnLoading = false
        this.editing = false
        this.content = ''
      }
    },

    async deleteTicket() {
      try {
        this.btnLoading = true
        this.message = null

        await patchTicket(this.getUserIdToken, this.$route.params.id, {
          status: ticketStatus.deleted,
          deletedAt: new Date().toISOString(),
        })

        this.message = 'Ticket excluido.'

        this.$store.commit('tickets/setUpdateTickets', true)

        setTimeout(() => {
          this.$router.replace({ name: 'dashboard' })
        }, 700)
      } catch (error) {
        this.message = error.message
      } finally {
        this.showSnackbar = true
        this.btnLoading = false
      }
    },
  },
}
</script>
