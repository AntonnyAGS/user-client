<template>
  <div class="item">
    <div class="item__title mb-8">Resumo</div>
    <div>Verifique os dados do seu projeto e corrija se necessário</div>

    <div class="summary__title">Nome do projeto</div>
    <div>{{ value.name }}</div>

    <div class="summary__title">Descrição projeto</div>
    <div>{{ value.description }}</div>

    <div v-if="archives.length > 0" class="d-flex flex-column">
      <div class="summary__title">Arquivos ({{ archives.length }})</div>
      <v-list width="100%">
        <v-list-item
          v-for="(file, index) in archives"
          :key="index"
          width="100%"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ file.fileName }}
            </v-list-item-title>
          </v-list-item-content>
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
import { ArchiveInput, ProjectInput } from '~/types'

export default defineComponent({
  name: 'StepArchives',

  props: {
    value: {
      type: Object as () => ProjectInput,
      required: true,
    },
    archives: {
      type: Array as () => ArchiveInput[],
      required: true,
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

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

<style lang="scss" scoped>
.summary {
  &__title {
    font-weight: 500;

    margin-bottom: 8px;
    margin-top: 16px;
  }
}
</style>
