<template>
  <v-container>
    <v-form @submit.prevent="submitForm()">
      <h2>Editando ticket #protocol do ticket aqui</h2>

      <v-row>
        <v-col cols="8">
          <v-text-field label="Titulo" variant="outlined" v-model="form.title"></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-select
            label="Prioridade"
            variant="outlined"
            v-model="form.priority"
            :items="priorities"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea
            label="Conteúdo"
            variant="outlined"
            rows="10"
            v-model="form.content"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn color="primary" prepend-icon="mdi-content-save" text="Salvar alterações" />
          <v-btn color="error" prepend-icon="mdi-close-circle" text="Finalizar" class="ml-4" />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { ticketConstants } from '@/constants/constants'
import handleError from '@/utils/errors/errors'

export default {
  data() {
    return {
      priorities: Object.values(ticketConstants),
      form: {},
      loading: false,
      errorMessage: '',
    }
  },

  created() {
    this.getTicketData(this.$route.params.id)
  },

  computed: {
    ...mapGetters('tickets', ['getTicketById', 'getCurrentTicket']),
    ...mapGetters('auth', ['getUserIdToken', 'getUserId']),
  },

  methods: {
    async getTicketData(ticketId) {
      try {
        this.loading = true

        const ticketData = this.getTicketById(ticketId)

        if (!ticketData || ticketData === undefined) {
          await this.$store.dispatch('tickets/fetchTicket', ticketId)
          this.form = { ...this.getCurrentTicket }
          return
        }

        this.form = { ...ticketData }
      } catch (error) {
        this.errorMessage = handleError(error)
      } finally {
        this.loading = false
      }
    },

    async submitForm() {
      try {
        await this.$store.dispatch('tickets/updateTicket', { ...this.form })
        this.$router.replace({ name: 'ticket-detail', params: { id: this.$route.params.id } })
      } catch (error) {
        console.log(handleError(error))
        throw error
      }
    },
  },
}
</script>
