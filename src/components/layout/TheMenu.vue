<template>
  <v-card>
    <v-navigation-drawer theme="dark" v-model="drawer">
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-plus-box"
          title="Novo ticket"
          value="newticket"
          :to="{ name: 'newticket' }"
        >
        </v-list-item>

        <v-divider></v-divider>

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

    <TheHeader @toggle-drawer="drawer = !drawer" />
    <!-- <v-main style="height: 250px"></v-main> -->
  </v-card>
</template>

<script>
import TheHeader from '../TheHeader.vue'

export default {
  components: { TheHeader },

  data() {
    return {
      drawer: true,
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
        // {
        //   title: 'Relatórios',
        //   icon: 'mdi-chart-bar', // Referência àquele teu trabalho com Mongo
        //   value: 'reports',
        //   path: 'reports',
        // },
        // {
        //   title: 'Clientes',
        //   icon: 'mdi-domain', // Ícone de prédio/empresa
        //   value: 'customers',
        //   path: 'customers',
        // },
        // {
        //   title: 'Configurações',
        //   icon: 'mdi-cog', // A engrenagem clássica
        //   value: 'settings',
        //   path: 'settings',
        // },
      ],
    }
  },
}
</script>
