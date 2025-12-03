<template>
  <v-navigation-drawer theme="dark" v-model="localDrawer">
    <v-list nav>
      <v-list-item
        prepend-icon="mdi-plus-box"
        title="Novo ticket"
        value="newticket"
        :to="{ name: 'newticket' }"
      >
      </v-list-item>

      <v-divider />

      <v-list-item
        v-for="menu in menus"
        :key="menu.title"
        :prepend-icon="menu.icon"
        :title="menu.title"
        :value="menu.value"
        :to="{ name: menu.path }"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: { type: Boolean, required: true },
  },
  emits: ['toggle-drawer'],

  data() {
    return {
      menus: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          value: 'dashboard',
          path: 'dashboard',
        },
        {
          title: 'Meus Tickets',
          icon: 'mdi-ticket-account',
          value: 'tickets',
          path: 'dashboard', // mudar depois pra somente vinculados ao usuario logado
        },
      ],
    }
  },

  computed: {
    localDrawer: {
      get() {
        return this.drawer
      },
      set(newDrawer) {
        this.$emit('toggle-drawer', newDrawer)
      },
    },
  },
}
</script>
