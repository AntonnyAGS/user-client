<template>
  <div class="create-account">
    <div class="create-account__container">
      <stepper
        :user.sync="user"
        :project.sync="project"
        :loading.sync="loading"
        :archives.sync="archives"
        @submit="handleUploadFiles"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

import { Stepper } from '@/components/CreateAccount'

import { UserInput, ProjectInput, ArchiveInput } from '@/types'

import { ProjectService, FileService } from '@/services'
import { useNotify } from '~/hooks/useNotify'
import { FileFactory } from '~/factories'
import { sleep } from '~/helpers'

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

    const archives = ref<[ArchiveInput] | []>([])

    const loading = ref(false)

    const handleUploadFiles = async (projectId: string) => {
      try {
        const files = await FileFactory.fromInputToVars(archives.value)

        const service = new FileService()

        await service.create(projectId, files)
      } catch (err) {
        notify({
          title: 'Erro ao subir arquivos',
          type: 'error',
        })
      }
    }

    const handleCreateProject = async () => {
      try {
        loading.value = true

        const service = new ProjectService()

        const created = await service.create(project.value)

        if (archives.value.length > 0) {
          handleUploadFiles(created._id)
        }

        await sleep(2000)

        notify({
          title: 'Projeto cadastrado!',
          type: 'success',
        })

        await sleep(500)

        redirect('/')
      } catch (err) {
        console.error(err)
        notify({
          title: 'Erro ao cadastrar projeto',
          type: 'error',
        })
      } finally {
        loading.value = false
      }
    }

    return {
      showPassword,
      user,
      project,
      loading,
      handleCreateProject,
      archives,
      handleUploadFiles,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
