<template>
  <form @submit.prevent="signup">
    <!-- <div>
      <label for="nome">nome</label>
      <input type="text" id="nome" v-model="nome" required />
    </div> -->
    <div>
      <label for="email">email</label>
      <input type="email" id="email" v-model.trim="email" required />
    </div>
    <div>
      <label for="password">senha</label>
      <input type="password" id="password" v-model.trim="password" required />
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
      // name: '',
      email: '',
      password: '',
      errorMessage: null,
    }
  },
  methods: {
    async signup() {
      try {
        await this.$store.dispatch('auth/signup', {
          // nome: this.name,
          email: this.email,
          password: this.password,
        })
        this.$router.replace({ name: 'login' })
      } catch (error) {
        this.errorMessage = handleError(error.message)
      }
    },
  },
}
</script>
