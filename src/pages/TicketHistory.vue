<template>
  <div>
    <h2>Historico de alteraçoes do chamado</h2>
    <p v-if="!errorMessage">{{ log }}</p>
    <p v-else>{{ errorMessage }}</p>
  </div>
</template>

<script>
import { getTicketLog } from '@/api/ticketService'
import { mapGetters } from 'vuex'

export default {
  created() {
    this.loadHistory()
  },

  data() {
    return {
      log: null,
      errorMessage: '',
    }
  },

  computed: {
    ...mapGetters('auth', ['getUserIdToken']),

    ticketId() {
      return this.$route.params.id
    },
  },

  methods: {
    async loadHistory() {
      this.log = await getTicketLog(this.getUserIdToken, this.ticketId)
      if (!this.log || this.log === null) {
        this.errorMessage = 'Não há alterações'
      }
    },
  },
}
</script>
