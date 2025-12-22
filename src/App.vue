<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('auth/tryAutoLogin')
  },
}
</script>
