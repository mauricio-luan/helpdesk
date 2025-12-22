<template>
  <v-container fluid class="h-100">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-5">
          <v-card-title class="mb-5">Novo ticket</v-card-title>

          <v-form ref="form" @submit.prevent="submitForm">
            <v-text-field label="Titulo" v-model="title" :rules="[rules.required]" required />
            <v-textarea
              label="Conteudo"
              v-model="content"
              :rules="[rules.required]"
              required
              rows="15"
            />
            <v-select
              label="Prioridade"
              v-model="priority"
              :items="priorities"
              :rules="[rules.required]"
              required
            />

            <v-btn color="success" type="submit" :loading="loading" block class="mt-4">
              Criar
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" location="top">
      {{ snackbar.text }}
      <template v-slot:actions="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
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
      loading: false,
      snackbar: {
        show: false,
        text: '',
        color: 'success',
      },
      rules: {
        required: (value) => !!value || 'Este campo é obrigatório.',
      },
    }
  },

  computed: {
    ...mapGetters('auth', ['getUserId', 'getUserEmail']),

    priorities() {
      return Object.values(ticketConstants)
    },
  },

  methods: {
    async submitForm() {
      if (!this.$refs.form.validate()) return

      this.loading = true
      try {
        const ticketPayload = {
          title: this.title,
          content: this.content,
          priority: this.priority,
          authorId: this.getUserId,
          authorEmail: this.getUserEmail,
        }

        await createTicket(ticketPayload)
        this.$store.commit('tickets/setUpdateTickets', true)

        this.showSnackbar('Chamado criado com sucesso!', 'success')
        this.$refs.form.reset()
      } catch (error) {
        console.error(error)
        this.showSnackbar('Erro ao criar chamado.', 'error')
      } finally {
        this.loading = false
      }
    },

    showSnackbar(text, color) {
      this.snackbar.text = text
      this.snackbar.color = color
      this.snackbar.show = true
    },
  },
}
</script>
