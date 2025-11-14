<template>
  <form @submit.prevent="signup">
    <div>
      <label for="nome">nome</label>
      <input type="text" id="nome" v-model="nome" />
    </div>
    <div>
      <label for="email">email</label>
      <input type="email" id="email" v-model="email" />
    </div>
    <div>
      <label for="senha">senha</label>
      <input type="password" id="senha" v-model="senha" />
    </div>
    <button>Cadastrar</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      nome: '',
      email: '',
      senha: '',
    }
  },
  methods: {
    async signup() {
      await this.$store.dispatch('auth/register', {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
      })
    },
  },
}
</script>
