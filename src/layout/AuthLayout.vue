<template>
  <v-main class="d-flex align-center justify-center bg-grey-lighten-3">
    <v-container class="fill-height d-flex justify-center align-center">
      <router-view></router-view>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>
