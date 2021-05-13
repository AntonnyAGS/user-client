<template>
  <div class="stepper">
    <v-stepper v-model="currentStep">
      <v-stepper-header>
        <v-stepper-step :complete="currentStep > 1" step="1">
          Dados básicos
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="currentStep > 2" step="2">
          Dados do projeto
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="currentStep > 3" step="3">
          Arquivos
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4"> Resumo </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content class="py-4" step="1">
          <basic-info
            :value="user"
            @click:submit="currentStep = 2"
            @input="$emit('update:user', $event)"
          />
        </v-stepper-content>

        <v-stepper-content class="py-4" step="2">
          <project-info
            :value="project"
            @click:submit="currentStep = 3"
            @click:back="currentStep = 1"
            @input="$emit('update:project', $event)"
          />
        </v-stepper-content>

        <v-stepper-content class="py-4" step="3">
          <archives
            :loading="loading"
            @click:submit="currentStep = 4"
            @click:back="currentStep = 2"
            @input="$emit('input', $event)"
          />
        </v-stepper-content>
        <v-stepper-content class="py-4" step="4">
          <summary-info
            :value="project"
            :loading="loading"
            @click:submit="currentStep = 4"
            @click:back="currentStep = 2"
          />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { Project, UserInput } from '@/types'
import BasicInfo from './BasicInfo.vue'
import ProjectInfo from './ProjectInfo.vue'
import Archives from './Archives.vue'
import SummaryInfo from './Summary.vue'

export default defineComponent({
  name: 'Stepper',
  components: {
    BasicInfo,
    ProjectInfo,
    Archives,
    SummaryInfo,
  },
  props: {
    project: {
      type: Object as () => Project,
      required: true,
    },
    user: {
      type: Object as () => UserInput,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
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
