<template>
  <h2>Historico de alteraçoes do chamado</h2>

  <v-container v-if="log">
    <v-row v-for="register in log" :key="register.date" style="background-color: aqua">
      <v-col cols="3" style="background-color: antiquewhite"
        >{{ formatDate(register.date) }}<br />{{ register.editedBy }}</v-col
      >

      <v-col cols="9" style="background-color: blueviolet">
        <v-row v-for="log in register.log" :key="log.field" style="background-color: yellow">
          <!-- ajustar grid -->
          <div style="background-color: cadetblue">{{ log.field }}</div>
          <v-col cols="6" style="background-color: violet">De: {{ log.from }}</v-col>
          <v-col cols="6" style="background-color: blue">Para: {{ log.to }}</v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <p v-else>Não há alterações</p>
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
