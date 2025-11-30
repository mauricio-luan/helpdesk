<template>
  <v-list-item>
    <v-card hover width="1200" :to="{ name: 'ticket-detail', params: { id: ticket.id } }">
      <v-card-item>
        <v-card-title></v-card-title>
      </v-card-item>

      <v-card-text>
        <v-label text="Assunto"></v-label>
        {{ ticket.title }}
      </v-card-text>

      <section>
        <label for="protocol">Protocolo: </label>
        <span>#76347</span>
      </section>

      <section>
        <label for="title">Assunto: </label>
        <span>{{ ticket.title }}</span>
      </section>

      <section>
        <label for="priority">Prioridade: </label>
        <span>{{ ticket.priority }}</span>
      </section>

      <section>
        <label for="timedate">Data/Hora: </label>
        <span>{{ ticket.createdAt }}</span>
      </section>
    </v-card>
  </v-list-item>
</template>

<script>
export default {
  props: {
    ticket: { type: Object, required: true },
  },
}
</script>
