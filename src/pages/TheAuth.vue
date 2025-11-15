<template>
  <form @submit.prevent="signup">
    <div>
      <label for="nome">nome</label>
      <input type="text" id="nome" v-model="nome" required />
    </div>
    <div>
      <label for="email">email</label>
      <input type="email" id="email" v-model.trim="email" required />
    </div>
    <div>
      <label for="senha">senha</label>
      <input type="password" id="senha" v-model.trim="senha" required />
    </div>
    <button>Cadastrar</button>
  </form>

  <p v-if="errorMessage">{{ errorMessage }}</p>
</template>

<script>
import handleError from '@/utils/errors/errors'

export default {
  data() {
    return {
      nome: '',
      email: '',
      senha: '',
      errorMessage: null,
    }
  },
  methods: {
    async signup() {
      try {
        await this.$store.dispatch('auth/signup', {
          nome: this.nome,
          email: this.email,
          senha: this.senha,
        })
        this.cleanForm()
      } catch (error) {
        this.errorMessage = handleError(error.message)
        console.error('signup: ', error.message)
      }
    },

    cleanForm() {
      this.nome = ''
      this.email = ''
      this.senha = ''
    },
  },
}
</script>
