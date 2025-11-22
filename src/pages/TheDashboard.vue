<template>
  <div>
    <div><h1>Tickets</h1></div>

    <div>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione nemo tenetur pariatur
      voluptatum accusamus, omnis officiis, earum excepturi voluptate ab suscipit quae dolores
      possimus repellat nisi commodi voluptatem! Repudiandae, accusamus.
    </div>
  </div>
</template>
<script>
import * as ticketService from '@/api/ticketService'

export default {
  data() {
    return {
      tickets: [],
    }
  },

  created() {
    this.getTickets()
  },
  methods: {
    async getTickets() {
      const userToken = this.$store.getters['auth/getUserIdToken']
      console.log(userToken)
      const tickets = await ticketService.getTickets(userToken)
      console.log(tickets)
    },
  },
}
</script>
<style lang=""></style>
