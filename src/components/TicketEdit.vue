<template>
  <h1>Editando ticket</h1>
  <!--
  {
    "id": "-Oei8M3b5myMljdKcxEG",
    "authorEmail": "mauricioluan2023@gmail.com",
    "authorId": "7EGTDqKSMLOcHJBcldoHNQZJyyB2",
    "content": "solicito alteração da rota de todas as bandeeiras para Vero.\n\nlogico 23894798274",
    "createdAt": "2025-11-23T00:37:59.525Z",
    "priority": "medium",
    "status": "open",
    "title": "Troca de adquirente - VERO"
} -->
  <form @submit.prevent="submitForm()">
    <div>
      <label for="title">Titulo: </label>
      <input type="text" name="title" id="title" v-model="form.title" />
    </div>
    <div>
      <label for="content">Conteudo: </label><br />
      <textarea name="content" id="content" v-model="form.content" rows="20" />
    </div>
    <div>
      <label for="priority">Prioridade: </label>
      <select name="priority" id="priority" v-model="form.priority">
        <option :value="priorities.LOW">Baixa</option>
        <option :value="priorities.MEDIUM">Media</option>
        <option :value="priorities.HIGH">Alta</option>
      </select>
    </div>

    <button>Salvar</button>
    <button @click="finishTicket">Finalizar</button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { ticketConstants } from '@/constants/constants'

export default {
  data() {
    return {
      priorities: ticketConstants,
      form: {},
      loading: false,
      errorMessage: '',
    }
  },

  created() {
    this.getTicketData(this.$route.params.id)
    console.log(this.form)
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
        this.errorMessage = error
      } finally {
        this.loading = false
      }
    },

    async submitForm() {
      try {
        const payload = {
          ...this.form,
          editedBy: this.getUserId,
        }

        await this.$store.dispatch('tickets/updateTicket', payload)
        this.$router.replace({ name: 'ticket-detail', params: { id: this.$route.params.id } })
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },
}
</script>
