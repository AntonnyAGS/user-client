<template>
  <div class="item">
    <div class="item__title mb-8">Arquivos</div>
    <div>
      Por favor, envie-nos imagens e documentos do seu negocio e inspirações
      para nos ajudar (logotipo, manual de identidade visual, fotos de
      estabelecimento, etc).
    </div>
    <v-text-field
      placeholder="Nome do arquivo"
      class="mt-8 pt-0 mb-4"
      label="Nome do arquivo"
      background-color="white"
      height="42px"
      hide-details
      type="text"
      style="border-radius: 0 !important"
      filled
    />
    <div class="d-flex" style="gap: 16px">
      <v-file-input
        v-model="files"
        placeholder="Nome do arquivo"
        class="mt-0 pt-0"
        label="Arquivo"
        background-color="white"
        style="border-radius: 0 !important"
        filled
        :show-size="1000"
      />
      <v-btn color="primary" height="56px">
        <v-icon>fas fa-plus</v-icon>
      </v-btn>
    </div>
    <v-btn
      height="56px"
      type="submit"
      color="primary"
      class="mt-8"
      @click="handleSubmit"
    >
      Continuar
    </v-btn>
    <v-btn text class="mt-8" height="56px" @click="$emit('click:back')">
      Voltar
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'StepArchives',

  setup(_, { emit }) {
    const files = ref()

    const handleSubmit = () => {
      emit('click:submit')
    }
    return {
      handleSubmit,
      files,
    }
  },
})
</script>
