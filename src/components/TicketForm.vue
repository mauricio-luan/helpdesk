<template>
  <section>
    <form @submit.prevent="submitForm()">
      <div>
        <label for="title">Titulo: </label>
        <input type="text" name="title" id="title" v-model="title" />
      </div>
      <div>
        <label for="content">Conteudo: </label><br />
        <textarea name="content" id="content" v-model="content" rows="20" />
      </div>
      <div>
        <label for="priority">Prioridade: </label>
        <select name="priority" id="priority" v-model="priority">
          <option :value="priorities.LOW">Baixa</option>
          <option :value="priorities.MEDIUM">Media</option>
          <option :value="priorities.HIGH">Alta</option>
        </select>
      </div>

      <button>Criar</button>
    </form>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { ticketConstants } from '@/constants/constants'
import * as ticketService from '@/api/ticketService'

export default {
  name: 'TicketForm',

  props: {
    mode: { type: String, required: true, default: 'create' },
  },

  data() {
    return {
      title: '',
      content: '',
      priority: 'low',
      // analysts: [],
      priorities: null,
    }
  },

  created() {
    this.priorities = ticketConstants
    // this.analysts = this.getAnalysts()
  },

  computed: {
    ...mapGetters('auth', ['getUserId', 'getUserEmail', 'getUserIdToken']),
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

        await ticketService.createTicket(ticketPayload, this.getUserIdToken)

        alert('chamado criado!')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
