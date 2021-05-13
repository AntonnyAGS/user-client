<template>
  <div class="login">
    <div class="login__container">
      <div class="login__content">
        <div class="login__title">Bem vindo (a)</div>
        <div class="login__description">
          Faça seu login e desfrute da plataforma
        </div>
        <v-form ref="form" @submit.prevent>
          <v-text-field
            v-model="email"
            :rules="rules.email"
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
            v-model="password"
            :rules="rules.password"
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
          <v-btn
            type="submit"
            height="48px"
            color="primary"
            block
            :loading="loading"
            @click="handleSubmit"
          >
            Entrar
          </v-btn>
          <div class="login__create-account">
            <nuxt-link to="/create-account">
              Ainda não possui uma conta? Cadastre-se
            </nuxt-link>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { AuthService } from '@/services'
import { validateEmail } from '~/helpers'
import { useNotify } from '~/hooks/useNotify'

export default defineComponent({
  layout: 'unauthorized',

  setup() {
    const showPassword = ref(false)
    const form = ref()
    const email = ref('')
    const password = ref('')
    const loading = ref(false)

    const notify = useNotify()

    const rules = {
      email: [(v: string) => validateEmail(v) || 'Digite um email válido'],
      password: [
        (v: string) => (!!v && v.length > 5) || 'Digite uma senha válida',
      ],
    }

    const error = ref({
      show: false,
      message: '',
    })

    const { redirect } = useContext()

    const handleSubmit = async () => {
      if (!form.value) {
        return
      }
      if (form.value.validate()) {
        loading.value = true
        try {
          const service = new AuthService()
          await service.auth({
            email: email.value,
            password: password.value,
          })
          redirect('/dashboard')
        } catch (er) {
          error.value.message = er.message
          error.value.show = true
          notify({
            title: 'Erro ao logar',
            text: error.value.message,
            type: 'error',
          })
        } finally {
          loading.value = false
        }
      }
    }

    return { showPassword, form, email, password, rules, handleSubmit, loading }
  },
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
