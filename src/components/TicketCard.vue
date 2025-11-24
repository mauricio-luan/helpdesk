<template>
  <li>
    <section>
      <label for="protocol">Protocolo: </label>
      <span>#76347</span>
    </section>

    <section>
      <router-link :to="{ name: 'ticket-detail', params: { id: ticket.id } }">
        <label for="title">Assunto: </label>
        <span>{{ ticket.title }}</span>
      </router-link>
    </section>

    <section>
      <label for="priority">Prioridade: </label>
      <span>{{ ticket.priority }}</span>
    </section>

    <section>
      <label for="timedate">Data/Hora: </label>
      <span>{{ ticket.createdAt }}</span>
    </section>
  </li>
</template>

<script>
export default {
  props: {
    ticket: { type: Object, required: true },
  },
}
</script>
