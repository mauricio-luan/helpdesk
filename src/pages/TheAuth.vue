<template>
  <div></div>
  <!-- <base-card
    :is-signup="true"
    :name="name"
    :email="email"
    :password="password"
    @click="signup"
  ></base-card> -->
</template>

<script>
import handleError from '@/utils/errors/errors'
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errorMessage: null,
    }
  },
  methods: {
    async signup() {
      try {
        await this.$store.dispatch('auth/signup', {
          nome: this.name,
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
