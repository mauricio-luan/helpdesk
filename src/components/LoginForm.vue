<template>
  <SnackBar v-if="errorMessage" v-model:snackbar="showSnackbar" :text="errorMessage" />

  <v-card class="mx-auto px-6 py-8" width="400">
    <v-form v-model="form" @submit.prevent="submitForm">
      <v-text-field
        type="Email"
        v-model.trim="email"
        :readonly="loading"
        :rules="[required]"
        class="mb-2"
        label="Email"
        placeholder="Insira o email"
        clearable
      />

      <v-text-field
        type="password"
        v-model.trim="password"
        :readonly="loading"
        :rules="[required]"
        label="Senha"
        placeholder="Insira a senha"
        clearable
      />

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
        Entrar
      </v-btn>

      <br />
      <router-link :to="{ name: 'register' }">Cadastrar</router-link>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null,
      form: false,
      loading: false,
      showSnackbar: false,
    }
  },

  methods: {
    required(v) {
      return !!v || 'Preenchimento do campo é obrigatório.'
    },

    async submitForm() {
      try {
        this.errorMessage = null
        this.loading = true

        await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
        })

        this.$router.replace({ name: 'dashboard' })
      } catch (error) {
        this.errorMessage = error.message
        this.showSnackbar = true
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
