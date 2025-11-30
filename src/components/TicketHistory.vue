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
    this.ticketId = this.$route.params.ticketId
    this.history(this.getUserIdToken, this.ticketId)
  },

  data() {
    return {
      ticketId: '',
      log: null,
      errorMessage: '',
    }
  },

  computed: {
    ...mapGetters('auth', ['getUserIdToken']),
  },

  methods: {
    async history(userIdToken, ticketId) {
      this.log = await getTicketLog(userIdToken, ticketId)
      if (!this.log || this.log === null) {
        this.errorMessage = 'Não há alterações'
      }
    },
  },
}
</script>
<style lang=""></style>
