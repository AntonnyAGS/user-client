<template>
  <div class="project">
    <div class="project__container">
      <ProjectDetail />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

import ProjectDetail from '@/components/ProjectDetail'

import { ArchiveInput, ProjectInput } from '@/types'

import { ProjectService } from '@/services/ProjectService'
import { useNotify } from '~/hooks/useNotify'
import { FileFactory } from '~/factories'
import { FileService } from '~/services'

export default defineComponent({
  components: {
    ProjectDetail,
  },

  setup() {
    const notify = useNotify()

    const { redirect } = useContext()

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

        redirect('/projects')
      } catch (err) {
        notify({
          title: 'Erro ao cadastrar/logar usuário',
          type: 'error',
        })
      } finally {
        loading.value = true
      }
    }

    return { project, loading, handleCreateProject, archives }
  },
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
