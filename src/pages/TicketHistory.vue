<template>
  <h2>Historico de alteraçoes do chamado</h2>

  <v-container>
    <v-row v-if="log">
      <v-col cols="12">
        <v-row v-for="register in log" :key="register.date">
          <v-col cols="3">
            {{ formatDate(register.date) }}
            <br />
            {{ register.editedBy }}
          </v-col>

          <v-col cols="9">
            <v-row v-for="log in register.log" :key="log.field">
              <!-- {{ log.field }} -->
              <v-col cols="6">De: {{ log.from }}</v-col>
              <v-col cols="6">Para: {{ log.to }}</v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <p v-else>Não há alterações</p>
  </v-container>
</template>

<script>
import { getTicketLog } from '@/api/ticketService'
import { mapGetters } from 'vuex'
import { formatDate } from '@/utils/utils'

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

  watch: {
    ticketId() {
      this.loadHistory()
    },
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
    },

    formatDate: formatDate,
  },
}
</script>
