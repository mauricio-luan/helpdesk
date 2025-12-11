<template>
  <v-card hover :to="{ name: 'ticket-detail', params: { id: ticket.id } }">
    <v-card-text>
      <v-row class="align-center">
        <v-col cols="3"> # {{ ticket.protocol ? ticket.protocol : 'Sem protocolo' }}</v-col>

        <v-col cols="3">
          {{ ticket.title }}
        </v-col>

        <v-col cols="2">
          {{ ticket.priority }}
        </v-col>

        <v-col cols="2">
          {{ formatDate(ticket.createdAt) }}
        </v-col>

        <v-col cols="2">
          <v-chip variant="flat" color="success">{{ ticket.status }}</v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { formatDate } from '@/utils/utils'

export default {
  props: {
    ticket: { type: Object, required: true },
  },

  methods: {
    formatDate: formatDate,
  },
}
</script>
