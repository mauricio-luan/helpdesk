<template>
  <v-layout>
    <TheHeader @toggle-drawer="drawer = !drawer" />
    <TheMenu :drawer="drawer" />

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <TheFooter />
  </v-layout>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheMenu from '@/components/TheMenu.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  components: { TheHeader, TheMenu, TheFooter },

  data() {
    return { drawer: true }
  },
}
</script>
