<template>
  <div class="item">
    <v-form ref="form" @submit.prevent>
      <div class="item__title mb-8">Dados básico</div>
      <v-text-field
        v-mask="['###.###.###-##', '##.###.###/####-##']"
        :rules="rules.cpfOrCnpj"
        :value="value.cpfOrCnpj"
        placeholder="000.000.000-00"
        class="mt-0 pt-0"
        label="CPF ou CNPJ"
        background-color="white"
        type="text"
        style="border-radius: 0 !important"
        filled
        @blur="handleUpdate('cpfOrCnpj', $event.target.value)"
      />

      <v-text-field
        placeholder="seu@email.com"
        class="mt-0 pt-0"
        :value="value.email"
        :rules="rules.email"
        label="Email"
        background-color="white"
        type="text"
        style="border-radius: 0 !important"
        filled
        @blur="handleUpdate('email', $event.target.value)"
      />

      <v-text-field
        class="mt-0 pt-0"
        :value="value.name"
        :rules="rules.name"
        placeholder="João da Silva Santos"
        style="border-radius: 0 !important"
        background-color="white"
        label="Nome completo ou razão social"
        filled
        @blur="handleUpdate('name', $event.target.value)"
      />

      <v-text-field
        v-mask="['(##) #####-####', '(##) ####-####']"
        class="mt-0 pt-0"
        :value="value.phone"
        :rules="rules.phone"
        placeholder="(11) 11111-1111"
        style="border-radius: 0 !important"
        background-color="white"
        label="Telefone"
        filled
        @blur="handleUpdate('phone', $event.target.value)"
      />

      <v-text-field
        class="mt-0 pt-0"
        :value="value.password"
        :rules="rules.password"
        placeholder="*****"
        style="border-radius: 0 !important"
        type="password"
        background-color="white"
        label="Senha"
        filled
        @blur="handleUpdate('password', $event.target.value)"
      />

      <v-text-field
        :value="value.confirmPassword"
        class="mt-0 pt-0"
        :rules="rules.password"
        placeholder="*****"
        type="password"
        style="border-radius: 0 !important"
        background-color="white"
        label="Confirme sua senha"
        filled
        @input="handleUpdate('confirmPassword', $event)"
      />

      <v-btn
        height="56px"
        type="submit"
        color="primary"
        class="mt-8"
        @click="handleSubmit"
      >
        Continuar
      </v-btn>
      <v-btn height="56px" text class="mt-8" @click="handleBack">
        Voltar
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

import { clone, validateCnpj, validateCpf, validateEmail } from '@/helpers'

import { mask } from 'vue-the-mask'
import { UserInput } from '~/types'

export default defineComponent({
  name: 'StepBasicInfo',

  directives: {
    mask,
  },

  props: {
    value: {
      type: Object as () => UserInput,
      required: true,
    },
  },

  setup(props, { emit }) {
    const { redirect } = useContext()
    const form = ref()

    const handleBack = () => {
      redirect('/')
    }

    const handleUpdate = (key: keyof UserInput, value: string | number) => {
      const newObj = clone(props.value)
      emit('input', Object.assign(newObj, { [key]: value }))
    }

    const rules = {
      email: [(v: string) => validateEmail(v) || 'Digite um email válido'],
      name: [(v: string) => v.length > 4 || 'Digite um nome válido'],
      cpfOrCnpj: [
        (v: string) =>
          validateCpf(v) || validateCnpj(v)
            ? true
            : 'Digite um nome CPF ou CNPJ válido',
      ],
      phone: [
        (v: string) =>
          v.length === 15 || v.length === 14 || 'Digite um telefone válido',
      ],
      password: [
        (v: string) => v.length > 5 || 'A senha deve ter mais de 5 dígitos',
        () =>
          props.value.confirmPassword === props.value.password ||
          'As senhas devem coincidir',
      ],
    }

    const handleSubmit = () => {
      if (form.value && form.value.validate()) {
        emit('click:submit')
      }
    }
    return {
      handleUpdate,
      rules,
      handleSubmit,
      form,
      handleBack,
    }
  },
})
</script>
