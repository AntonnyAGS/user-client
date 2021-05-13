<template>
  <div class="create-account">
    <div class="create-account__container">
      <stepper
        :user.sync="user"
        :project.sync="project"
        :loading.sync="loading"
        @submit="handleCreateProject"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

import { Stepper } from '@/components/CreateAccount'

import { UserInput, ProjectInput } from '@/types'

import { ProjectService } from '@/services/ProjectService'
import { useNotify } from '~/hooks/useNotify'

export default defineComponent({
  components: {
    Stepper,
  },
  layout: 'unauthorized',

  setup() {
    const showPassword = ref(false)

    const notify = useNotify()

    const { redirect } = useContext()

    const user = ref<UserInput>({
      email: '',
      phone: '',
      cpfOrCnpj: '',
      name: '',
      password: '',
      confirmPassword: '',
    })

    const project = ref<ProjectInput>({
      name: '',
      description: '',
    })

    const loading = ref(false)

    const handleCreateProject = async () => {
      try {
        loading.value = true

        const service = new ProjectService()

        await service.create(project.value)
        redirect('/')
      } catch (err) {
        notify({
          title: 'Erro ao cadastrar/logar usuário',
          type: 'error',
        })
      } finally {
        loading.value = true
      }
    }

    return { showPassword, user, project, loading, handleCreateProject }
  },
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
