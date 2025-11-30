<template>
  <header>
    <div>
      <h1>
        <router-link :to="{ name: 'dashboard' }">Meu cabeçalho fodastico</router-link>
      </h1>
    </div>
    <div>
      <button @click="logoff">Logout</button>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logoff() {
      this.$store.dispatch('auth/logoff')
      this.$router.replace({ name: 'login' })
    },
  },
}
</script>
