<template>
  <v-container>
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" class="mr-4" @click="$router.back()"></v-btn>
      <h2 class="text-h5 font-weight-bold">Histórico de Alterações</h2>
    </div>

    <div v-if="loading" class="d-flex justify-center mt-10">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <v-timeline v-else-if="log && log.length" align="start" density="comfortable" side="end">
      <v-timeline-item
        v-for="(register, index) in log"
        :key="index"
        dot-color="primary"
        icon="mdi-pencil"
        size="small"
      >
        <template v-slot:opposite>
          <span class="text-caption text-medium-emphasis font-weight-bold">
            {{ formatDate(register.date) }}
          </span>
        </template>

        <v-card elevation="2" class="rounded-lg">
          <v-card-title class="text-subtitle-1 py-2 px-4 bg-grey-lighten-4">
            <span class="font-weight-medium">Alterado por: </span>
            <span class="text-primary">{{ register.editedBy }}</span>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text class="pa-0">
            <v-table density="compact" class="text-body-2">
              <thead>
                <tr>
                  <th class="text-left font-weight-bold">Campo</th>
                  <th class="text-left font-weight-bold text-red-darken-1">De</th>
                  <th class="text-left font-weight-bold text-teal-darken-1">Para</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="change in register.log" :key="change.field">
                  <td class="font-weight-medium text-capitalize">{{ change.field }}</td>
                  <td class="text-grey-darken-1">
                    <span v-if="change.from">{{ change.from }}</span>
                    <span v-else class="text-caption font-italic text-grey-lighten-1">Vazio</span>
                  </td>
                  <td class="text-black font-weight-medium">
                    <span v-if="change.to">{{ change.to }}</span>
                    <span v-else class="text-caption font-italic text-grey-lighten-1">Vazio</span>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <v-empty-state
      v-else
      icon="mdi-history"
      title="Nenhuma alteração registrada"
      text="Este chamado ainda não possui histórico de edições."
      class="mt-10"
    ></v-empty-state>
  </v-container>
</template>

<script>
import { getTicketLog } from '@/api/ticketService'
import { formatDate } from '@/utils/utils'

export default {
  created() {
    this.loadHistory()
  },

  data() {
    return {
      log: null,
      loading: false,
      errorMessage: '',
    }
  },

  watch: {
    ticketId() {
      this.loadHistory()
    },
  },

  computed: {
    ticketId() {
      return this.$route.params.id
    },
  },

  methods: {
    async loadHistory() {
      try {
        this.loading = true
        this.log = await getTicketLog(this.ticketId)
      } catch (error) {
        this.errorMessage = error.message
      } finally {
        this.loading = false
      }
    },

    formatDate: formatDate,
  },
}
</script>
