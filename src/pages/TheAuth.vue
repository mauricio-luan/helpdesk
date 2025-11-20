<template>
  <form @submit.prevent="submitForm">
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

  <p v-if="successMessage">{{ successMessage }}</p>
  <p v-if="errorMessage">{{ errorMessage }}</p>
</template>

<script>
import handleError from '@/utils/errors/errors'
import { createAccount } from '@/api/authService'

export default {
  data() {
    return {
      email: '',
      password: '',
      successMessage: null,
      errorMessage: null,
      isLoading: false,
    }
  },

  methods: {
    async submitForm() {
      try {
        this.isLoading = true

        await createAccount({
          email: this.email,
          password: this.password,
        })

        this.successMessage = 'Conta criada com sucesso!'
        console.log(this.successMessage)

        this.$router.replace({ name: 'login' })
      } catch (error) {
        this.errorMessage = handleError(error.message)
        console.error(this.errorMessage)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
