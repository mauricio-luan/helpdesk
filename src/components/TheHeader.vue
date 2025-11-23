<template>
  <header>
    <div>
      <h1>Meu cabeçalho fodastico</h1>
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
