<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Cadastro</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submitForm">
              <v-text-field
                label="Email"
                name="email"
                prepend-inner-icon="mdi-email"
                type="email"
                v-model="email"
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
                v-model="password"
                :rules="passwordRules"
                required
                variant="outlined"
              ></v-text-field>

              <v-btn
                color="primary"
                :loading="isLoading"
                type="submit"
                block
                size="large"
                class="mt-4"
              >
                Cadastrar
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center pb-4">
            <router-link :to="{ name: 'login' }" class="text-decoration-none">
              Já tem conta? Entrar
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <SnackBar v-if="message" v-model:snackbar="showSnackbar" :text="message" />
  </v-container>
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
      emailRules: [
        (v) => !!v || 'E-mail é obrigatório',
        (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
      ],
      passwordRules: [
        (v) => !!v || 'Senha é obrigatória',
        (v) => (v && v.length >= 6) || 'Senha deve ter pelo menos 6 caracteres',
      ],
    }
  },

  methods: {
    async submitForm() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) return

      try {
        this.isLoading = true
        await createAccount({ email: this.email, password: this.password })

        this.message = 'Conta criada com sucesso!'
        this.showSnackbar = true

        setTimeout(() => {
          this.$router.replace({ name: 'login' })
        }, 1200)
      } catch (error) {
        this.message = error.message || 'Erro ao criar conta'
        this.showSnackbar = true
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
