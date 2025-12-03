<template>
  <TheMenu />

  <v-main>
    <router-view></router-view>
  </v-main>

  <TheFooter />
</template>

<script>
import TheMenu from '@/components/layout/TheMenu.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
export default {
  components: { TheMenu, TheFooter },
}
</script>
