<template>
  <v-app-bar elevation="1" density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />

      <router-link :to="{ name: 'dashboard' }">
        <v-app-bar-title text="Helpdesk" />
      </router-link>
    </template>

    <template v-slot:append>
      <v-btn icon="mdi-logout" variant="text" @click="logoff">Sair</v-btn>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  emits: ['toggle-drawer'],

  methods: {
    logoff() {
      this.$store.dispatch('auth/logoff')
      this.$router.replace({ name: 'login' })
    },
  },
}
</script>
