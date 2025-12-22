<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submitForm">
              <v-text-field
                label="Email"
                name="email"
                prepend-inner-icon="mdi-email"
                type="email"
                v-model.trim="email"
                :rules="emailRules"
                required
                variant="outlined"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Senha"
                name="password"
                prepend-inner-icon="mdi-lock"
                type="password"
                v-model.trim="password"
                :rules="passwordRules"
                required
                variant="outlined"
              ></v-text-field>

              <v-btn
                color="primary"
                :loading="loading"
                type="submit"
                block
                size="large"
                class="mt-4"
              >
                Entrar
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center pb-4">
            <router-link :to="{ name: 'register' }" class="text-decoration-none">
              Não tem conta? Cadastre-se
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <SnackBar v-if="errorMessage" v-model:snackbar="showSnackbar" :text="errorMessage" />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null,
      loading: false,
      showSnackbar: false,
      emailRules: [
        (v) => !!v || 'E-mail é obrigatório',
        (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
      ],
      passwordRules: [(v) => !!v || 'Senha é obrigatória'],
    }
  },

  methods: {
    async submitForm() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) return

      try {
        this.errorMessage = null
        this.loading = true

        await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
        })

        this.$router.replace({ name: 'dashboard' })
      } catch (error) {
        this.errorMessage = error.message || 'Erro ao realizar login'
        this.showSnackbar = true
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
