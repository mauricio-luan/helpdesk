<template>
  <v-card class="mx-auto px-6 py-8" max-width="344">
    <v-form v-model="form" @submit.prevent="login">
      <v-text-field
        type="Email"
        v-model.trim="email"
        :readonly="loading"
        :rules="[required]"
        class="mb-2"
        label="Email"
        clearable
      ></v-text-field>

      <v-text-field
        type="password"
        v-model.trim="password"
        :readonly="loading"
        :rules="[required]"
        label="Password"
        placeholder="Enter your password"
        clearable
      ></v-text-field>

      <br />

      <v-btn
        :disabled="!form"
        :loading="loading"
        color="success"
        size="large"
        type="submit"
        variant="elevated"
        block
      >
        Sign In
      </v-btn>

      <!-- No futuro inserir um alert -->
      <br />
      <router-link :to="{ name: 'auth' }">Sign up</router-link>

      <p v-if="errorMessage">
        {{ errorMessage }}
      </p>
    </v-form>
  </v-card>
</template>

<script>
import handleError from '@/utils/errors/errors'

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null,
      form: false,
      loading: false,
    }
  },
  methods: {
    required(v) {
      return !!v || 'Field is required.'
    },

    async login() {
      try {
        this.errorMessage = null
        this.loading = true

        await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
        })

        this.$router.replace({ name: 'home' })
      } catch (error) {
        this.loading = false
        this.errorMessage = handleError(error.message)
      }
    },
  },
}
</script>
