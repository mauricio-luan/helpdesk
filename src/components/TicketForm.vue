<!--
Entidade: Ticket

title: String
content: String
createdAt: Timestamp
Snapshot do Autor:
  authorId: String (ID do usuário)
  authorEmail: String (Para exibir na lista sem buscar no banco de users)
  assignedTo: String/Null (ID do técnico responsável) ???
-->
<template>
  <section>
    <form @submit.prevent>
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
    </form>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { ticketConstants } from '@/constants/ticket'

export default {
  name: 'TicketForm',

  data() {
    return {
      title: '',
      content: '',
      priority: 'low',
      analysts: [],
      priorities: null,
    }
  },

  created() {
    this.priorities = ticketConstants
    // this.analysts = this.getAnalysts()
  },

  computed: {
    ...mapGetters('auth', ['getUserId', 'getUserEmail']),
  },
}
</script>
