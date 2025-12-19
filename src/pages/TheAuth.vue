<template>
  <SnackBar v-if="message" v-model:snackbar="showSnackbar" :text="message" />

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
</template>

<script>
import { createAccount } from '@/api/authService'

export default {
  data() {
    return {
      email: '',
      password: '',
      message: null,
      isLoading: false,
      showSnackbar: false,
    }
  },

  methods: {
    async submitForm() {
      try {
        await createAccount({ email: this.email, password: this.password })

        this.message = 'Conta criada!'
        this.showSnackbar = true

        setTimeout(() => {
          this.$router.replace({ name: 'login' })
        }, 500)
      } catch (error) {
        this.message = error.message
        this.showSnackbar = true
      }
    },
  },
}
</script>
