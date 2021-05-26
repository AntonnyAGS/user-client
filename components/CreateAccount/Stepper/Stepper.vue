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
            @click:submit="handleCreateUser"
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
            :value="archives"
            :loading="loading"
            @click:submit="currentStep = 4"
            @click:back="currentStep = 2"
            @input="$emit('update:archives', $event)"
          />
        </v-stepper-content>
        <v-stepper-content class="py-4" step="4">
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
import { ArchiveInput, ProjectInput, UserInput } from '@/types'
import { UserFactory } from '@/factories'
import { UserService, AuthService } from '@/services'
import BasicInfo from './BasicInfo.vue'
import ProjectInfo from './ProjectInfo.vue'
import Archives from './Archives.vue'
import SummaryInfo from './Summary.vue'
import { useNotify } from '~/hooks/useNotify'

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
      type: Object as () => ProjectInput,
      required: true,
    },
    user: {
      type: Object as () => UserInput,
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
  setup(props, { emit }) {
    const currentStep = ref(3)

    const notify = useNotify()

    const handleCreateUser = async () => {
      try {
        emit('update:loading', true)
        const factory = new UserFactory()
        const service = new UserService()
        const authService = new AuthService()

        const createVars = factory.fromInputToVars(props.user)

        const user = await service.register(createVars)
        await authService.auth({
          email: user.email,
          password: props.user.password,
        })
        currentStep.value = 2
      } catch (err) {
        notify({
          title: 'Erro ao cadastrar/logar usuário',
          type: 'error',
        })
      } finally {
        emit('update:loading', false)
      }
    }

    return { currentStep, handleCreateUser }
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
