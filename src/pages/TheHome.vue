<template>
  <TheMenu />

  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script>
import TheMenu from '@/components/layout/TheMenu.vue'

export default {
  components: { TheMenu },
}
</script>
