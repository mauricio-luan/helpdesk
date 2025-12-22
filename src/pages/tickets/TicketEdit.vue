<template>
  <v-container>
    <v-form @submit.prevent="submitForm()">
      <h2 class="mb-5">
        {{ form.protocol ? form.protocol : 'Sem protocolo' }} -
        {{ form.title }}
      </h2>

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
          />
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
          <v-btn
            color="primary"
            prepend-icon="mdi-content-save"
            text="Salvar alterações"
            type="submit"
          />
          <!-- colocar botão de finalizar ticket aqui -->
          <v-btn
            color="error"
            prepend-icon="mdi-close-circle"
            text="Cancelar"
            class="ml-4"
            @click="$router.back()"
          />
        </v-col>
      </v-row>
    </v-form>
    <SnackBar v-if="message" v-model:snackbar="showSnackbar" :text="message" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { ticketConstants } from '@/constants/constants'

export default {
  data() {
    return {
      form: {},
      loading: false,
      message: null,
      showSnackbar: false,
    }
  },

  created() {
    this.getTicketData(this.$route.params.id)
  },

  computed: {
    ...mapGetters('tickets', ['getTicketById', 'getCurrentTicket']),
    ...mapGetters('auth', ['getUserId']),

    priorities() {
      return Object.values(ticketConstants)
    },
  },

  methods: {
    async getTicketData(ticketId) {
      try {
        this.loading = true
        this.message = null

        await this.$store.dispatch('tickets/fetchTicket', ticketId)
        this.form = { ...this.getCurrentTicket }
      } catch (error) {
        this.message = error.message || 'Erro ao carregar ticket'
        this.showSnackbar = true
      } finally {
        this.loading = false
      }
    },

    async submitForm() {
      try {
        this.loading = true
        await this.$store.dispatch('tickets/updateTicket', { ...this.form })
        this.$router.replace({ name: 'ticket-detail', params: { id: this.$route.params.id } })
      } catch (error) {
        console.error(error)
        this.message = error.message || 'Erro ao salvar alterações'
        this.showSnackbar = true
        this.loading = false
      }
    },
  },
}
</script>
