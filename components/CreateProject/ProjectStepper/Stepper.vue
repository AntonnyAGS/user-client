<template>
  <div class="stepper">
    <v-stepper v-model="currentStep">
      <v-stepper-header>
        <v-stepper-step :complete="currentStep > 2" step="1">
          Dados do projeto
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="currentStep > 3" step="2">
          Arquivos
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> Resumo </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content class="py-4" step="1">
          <project-info
            :value="project"
            @click:submit="currentStep = 2"
            @click:back="currentStep = 1"
            @input="$emit('update:project', $event)"
          />
        </v-stepper-content>

        <v-stepper-content class="py-4" step="2">
          <archives
            :value="archives"
            :loading="loading"
            @click:submit="currentStep = 3"
            @click:back="currentStep = 1"
            @input="$emit('update:archives', $event)"
          />
        </v-stepper-content>
        <v-stepper-content class="py-4" step="3">
          <summary-info
            :value="project"
            :archives="archives"
            :loading="loading"
            @click:submit="$emit('submit')"
            @click:back="currentStep = 3"
          />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { ArchiveInput, Project } from '@/types'
import ProjectInfo from './ProjectInfo.vue'
import Archives from './Archives.vue'
import SummaryInfo from './Summary.vue'

export default defineComponent({
  name: 'Stepper',
  components: {
    ProjectInfo,
    Archives,
    SummaryInfo,
  },
  props: {
    project: {
      type: Object as () => Project,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    archives: {
      type: Array as () => ArchiveInput[],
      required: true,
    },
  },
  setup() {
    const currentStep = ref(1)

    return { currentStep }
  },
})
</script>

<style lang="scss" scoped>
@import './styles.scss';
.stepper {
  width: 100%;
}
::v-deep .v-stepper {
  box-shadow: none !important;
  background: transparent !important;
  &__header {
    box-shadow: none !important;
  }
}
</style>
