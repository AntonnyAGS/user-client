<template>
  <div class="item">
    <v-form ref="form" @submit.prevent>
      <div class="item__title mb-8">Dados do projeto</div>
      <v-text-field
        :rules="rules.name"
        :value="value.name"
        placeholder="Nome do projeto"
        class="mt-0 pt-0"
        label="Nome do projeto"
        background-color="white"
        type="text"
        style="border-radius: 0 !important"
        filled
        @blur="handleUpdate('name', $event.target.value)"
      />

      <v-textarea
        placeholder="Descrição do seu projeto..."
        class="mt-0 pt-0"
        :value="value.description"
        :rules="rules.description"
        label="Descrição do seu projeto"
        background-color="white"
        type="text"
        style="border-radius: 0 !important"
        filled
        @blur="handleUpdate('description', $event.target.value)"
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
      <v-btn height="56px" text class="mt-8" @click="$emit('click:back')">
        Voltar
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import { clone } from '@/helpers'

import { mask } from 'vue-the-mask'
import { ProjectInput } from '~/types'

export default defineComponent({
  name: 'StepProjectInfo',

  directives: {
    mask,
  },

  props: {
    value: {
      type: Object as () => ProjectInput,
      required: true,
    },
  },

  setup(props, { emit }) {
    const form = ref()

    const handleUpdate = (key: keyof ProjectInput, value: string | number) => {
      const newObj = clone(props.value)
      emit('input', Object.assign(newObj, { [key]: value }))
    }

    const confirmPassword = ref('')

    const rules = {
      name: [(v: string) => v.length > 4 || 'Digite um nome válido'],
      description: [(v: string) => v.length > 8 || 'Digite uma descrição'],
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
      confirmPassword,
    }
  },
})
</script>
