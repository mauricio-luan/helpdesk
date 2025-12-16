<template>
  <h2>Historico de alteraçoes do chamado</h2>

  <v-container v-if="log">
    <v-row>
      <v-col cols="3">Quem / quando</v-col>
      <v-col cols="3">Campo</v-col>
      <v-col cols="3">De</v-col>
      <v-col cols="3">Para</v-col>
    </v-row>
    <v-row v-for="register in log" :key="register.date" style="background-color: aqua">
      <v-col cols="3" style="background-color: antiquewhite"
        >{{ formatDate(register.date) }}<br />{{ register.editedBy }}</v-col
      >

      <v-col cols="9" style="background-color: blueviolet">
        <v-row v-for="log in register.log" :key="log.field" style="background-color: yellow">
          <v-col cols="2">{{ log.field }}</v-col>
          <v-col cols="5" style="background-color: violet">{{ log.from }} </v-col>
          <v-col cols="5" style="background-color: blue">{{ log.to }}</v-col>
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
