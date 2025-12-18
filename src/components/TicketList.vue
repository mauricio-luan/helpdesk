<template>
  <SnackBar v-if="errorMessage" v-model:snackbar="showSnackbar" :text="errorMessage" />

  <v-container v-else>
    <v-row class="px-4 py-2 font-weight-bold text-medium-emphasis">
      <v-col cols="3">Protocolo</v-col>
      <v-col cols="3">Título</v-col>
      <v-col cols="2">Prioridade</v-col>
      <v-col cols="2">Data</v-col>
      <v-col cols="2">Status</v-col>
    </v-row>

    <v-data-iterator :items="getAllTickets" :page="page" :items-per-page="10">
      <template v-slot:default="{ items }">
        <v-row>
          <v-col v-for="item in items" :key="item.raw.id" cols="12" md="12">
            <TicketCard :ticket="item.raw" />
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn
            :disabled="page === 1"
            icon="mdi-arrow-left"
            density="comfortable"
            variant="tonal"
            rounded
            @click="prevPage"
          />

          <div class="mx-2 text-caption">Página {{ page }} de {{ pageCount }}</div>

          <v-btn
            :disabled="page === pageCount"
            icon="mdi-arrow-right"
            density="comfortable"
            variant="tonal"
            rounded
            @click="nextPage"
          />
        </div>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import TicketCard from './TicketCard.vue'

export default {
  components: { TicketCard },

  data() {
    return {
      page: 1,
      loading: false,
      errorMessage: null,
      showSnackbar: false,
    }
  },

  created() {
    if (!this.hasTickets || this.isNecessaryUpdateTickets) {
      this.getTickets()
    }
  },

  computed: {
    ...mapGetters('tickets', ['hasTickets', 'getAllTickets', 'isNecessaryUpdateTickets']),
  },

  methods: {
    async getTickets() {
      try {
        this.errorMessage = null
        this.loading = true

        await this.$store.dispatch('tickets/fetchTickets')
      } catch (error) {
        this.errorMessage = error.message
        this.showSnackbar = true
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
