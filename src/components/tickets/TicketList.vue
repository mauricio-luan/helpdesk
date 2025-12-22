<template>
  <SnackBar v-if="errorMessage" v-model:snackbar="showSnackbar" :text="errorMessage" />

  <v-container>
    <div v-if="loading" class="d-flex justify-center my-4">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <v-card v-else variant="flat" class="bg-transparent">
      <v-row
        class="px-4 py-2 mb-2 font-weight-bold text-medium-emphasis text-uppercase text-caption d-none d-md-flex"
      >
        <v-col cols="12" md="3">Protocolo</v-col>
        <v-col cols="12" md="3">Título</v-col>
        <v-col cols="12" md="2">Prioridade</v-col>
        <v-col cols="12" md="2">Data</v-col>
        <v-col cols="12" md="2">Status</v-col>
      </v-row>

      <v-data-iterator :items="getAllTickets" :page="page" :items-per-page="10">
        <template v-slot:default="{ items }">
          <v-row>
            <v-col v-for="item in items" :key="item.raw.id" cols="12">
              <TicketCard :ticket="item.raw" />
            </v-col>
          </v-row>
        </template>

        <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
          <div class="d-flex align-center justify-center pa-4 mt-4">
            <v-btn
              :disabled="page === 1"
              icon="mdi-arrow-left"
              density="comfortable"
              variant="text"
              @click="prevPage"
            />

            <div class="mx-4 text-caption font-weight-medium">
              Página {{ page }} de {{ pageCount }}
            </div>

            <v-btn
              :disabled="page === pageCount"
              icon="mdi-arrow-right"
              density="comfortable"
              variant="text"
              @click="nextPage"
            />
          </div>
        </template>
      </v-data-iterator>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import TicketCard from './TicketCard.vue'

export default {
  components: {
    TicketCard,
  },

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
