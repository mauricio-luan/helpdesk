<template>
  <v-app-bar flat border="b" density="compact" color="surface">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />

      <router-link
        :to="{ name: 'dashboard' }"
        class="d-flex align-center text-decoration-none text-high-emphasis ml-2"
      >
        <v-icon color="primary" class="mr-2">mdi-lifebuoy</v-icon>
        <v-app-bar-title class="font-weight-bold">Helpdesk</v-app-bar-title>
      </router-link>
    </template>

    <v-spacer></v-spacer>

    <template v-slot:append>
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="primary" variant="tonal" size="small">
              <span class="text-h6">{{ getUserEmail.charAt(0).toUpperCase() }}</span>
            </v-avatar>
          </v-btn>
        </template>

        <v-card>
          <v-card-text class="pa-2">
            <div class="mx-auto text-center">
              <v-avatar color="primary" variant="tonal" class="mb-2">
                {{ getUserEmail.charAt(0).toUpperCase() }}</v-avatar
              >
              <!-- <h3>Maurício</h3> -->
              <p class="text-caption mt-1">{{ getUserEmail }}</p>

              <v-divider class="my-3"></v-divider>

              <v-btn variant="text" rounded block>Editar perfil</v-btn>

              <v-btn variant="text" rounded block>Tema escuro</v-btn>

              <v-divider class="my-3"></v-divider>

              <v-btn variant="text" rounded block color="error" @click="logoff">Sair</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  emits: ['toggle-drawer'],

  computed: {
    ...mapGetters('auth', ['getUserEmail']),
  },

  methods: {
    logoff() {
      this.$store.dispatch('auth/logoff')
      this.$router.replace({ name: 'login' })
    },
  },
}
</script>
