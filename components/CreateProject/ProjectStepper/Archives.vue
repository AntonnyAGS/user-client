<template>
  <div class="item">
    <div class="item__title mb-8">Arquivos</div>
    <div>
      Por favor, envie-nos imagens e documentos do seu negocio e inspirações
      para nos ajudar (logotipo, manual de identidade visual, fotos de
      estabelecimento, etc).
    </div>
    <v-text-field
      v-model="fileName"
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
    <v-select
      v-model="fileType"
      placeholder="Tipo do arquivo"
      class="mt-0 pt-0 mb-4"
      label="Tipo do arquivo"
      background-color="white"
      height="42px"
      :items="types"
      hide-details
      type="text"
      menu-props="offsetY"
      no-data-text="Sem tipos disponíveis..."
      style="border-radius: 0 !important"
      filled
    />

    <div class="d-flex" style="gap: 16px">
      <v-file-input
        v-model="file"
        placeholder="Nome do arquivo"
        class="mt-0 pt-0"
        label="Arquivo"
        background-color="white"
        style="border-radius: 0 !important"
        filled
        :show-size="1000"
        accept="image/*,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
      />
      <v-btn
        color="primary"
        height="56px"
        :disabled="!file || !fileType || !fileName"
        @click="addFile"
      >
        <v-icon>fas fa-plus</v-icon>
      </v-btn>
    </div>
    <div class="d-flex flex-column">
      <v-list v-if="value.length > 0" width="100%">
        <v-list-item v-for="(file, index) in value" :key="index" width="100%">
          <v-list-item-content>
            <v-list-item-title>
              {{ file.fileName }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="removeFile(index)">
              <v-icon small> fas fa-trash </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </div>
    <v-btn
      height="56px"
      type="submit"
      color="primary"
      class="mt-8"
      :loading="loading"
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
import { FileType } from '~/enum'
import { clone, FileTypeToText } from '~/helpers'
import { ArchiveInput } from '~/types'

const types = [
  { value: FileType.LOGO, text: FileTypeToText[FileType.LOGO] },
  {
    value: FileType.REQUIREMENTS_DOCUMENT,
    text: FileTypeToText[FileType.REQUIREMENTS_DOCUMENT],
  },
]

export default defineComponent({
  name: 'StepArchives',

  props: {
    value: {
      type: Array as () => ArchiveInput[],
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const fileName = ref('')
    const fileType = ref('')
    const file = ref(null)

    const handleSubmit = () => {
      emit('click:submit')
    }

    const addFile = () => {
      const files = props.value

      files.push({
        fileName: fileName.value,
        fileType: fileType.value,
        file: file.value,
      })

      fileName.value = ''
      fileType.value = ''
      file.value = null

      emit('input', files)
    }

    const removeFile = (indexToRemove: number) => {
      const files = clone(props.value)
      const result = files.filter((_, index) => index !== indexToRemove)

      emit('input', result)
    }

    return {
      handleSubmit,
      fileName,
      fileType,
      file,
      types,
      addFile,
      removeFile,
    }
  },
})
</script>
