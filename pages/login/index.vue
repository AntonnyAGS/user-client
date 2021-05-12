<template>
  <div class="login">
    <div class="login__container">
      <div class="login__content">
        <div class="login__title">Bem vindo (a)</div>
        <div class="login__description">
          Faça seu login e desfrute da plataforma
        </div>
        <v-text-field
          label="Email"
          color="secondary"
          placeholder="Digite seu email aqui..."
          background-color="white"
          type="text"
          style="border-radius: 0 !important"
          class="login__textfield"
          filled
        >
          <template #prepend-inner>
            <v-icon color="secondary" class="mr-5"> fas fa-envelope </v-icon>
          </template>
        </v-text-field>
        <v-text-field
          label="Senha"
          color="secondary"
          placeholder="Digite seu senha aqui..."
          background-color="white"
          :type="!showPassword ? 'password' : 'text'"
          style="border-radius: 0 !important"
          class="login__textfield"
          :append-icon="!showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
          filled
          @click:append="showPassword = !showPassword"
        >
          <template #prepend-inner>
            <v-icon color="secondary" class="mr-5"> fas fa-envelope </v-icon>
          </template>
        </v-text-field>
        <div class="login__forgot-password">
          <nuxt-link to="/forgot-password">
            Esqueceu sua senha? Clique aqui
          </nuxt-link>
        </div>
        <v-btn height="48px" color="primary" block> Entrar </v-btn>
        <div class="login__create-account">
          <nuxt-link to="/create-account">
            Ainda não possui uma conta? Cadastre-se
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lan="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'unauthorized',

  setup() {
    const showPassword = ref(false)

    return { showPassword }
  },
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
