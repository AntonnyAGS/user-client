<template>
  <div class="project">
    <div class="project__container">
      <div class="project__content">
        <v-data-table
          :headers="headers"
          :items="projects"
          style="background: #f5f5f7; width: 100%; height: 100%;"
          class="elevation-1"
        >
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="getColor(item.status)"
              dark
            >
              {{ item.status }}
            </v-chip>
          </template>
        </v-data-table>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { UserInput, ProjectInput } from '@/types'

import { ProjectService } from '@/services/ProjectService'
import { useNotify } from '~/hooks/useNotify'

export default defineComponent({
  components: {
  },
  data () {
      return {
        headers: [
          {
            text: 'Nome do projeto',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Descrição', value: 'descricao', align: 'center'},
          { text: 'Status', value: 'status', align: 'center'},
        ],
        projects: [
          {
            name: 'Lorem Ipsum',
            descricao: 'Lorem Ipsum',
            status: 'Concluído',
          },
          {
            name: 'Lorem Ipsum',
            descricao: 'Lorem Ipsum',
            status: 'Em análise',
          },
          {
            name: 'Lorem Ipsum',
            descricao: 'Lorem Ipsum',
            status: 'Em andamento',
          },
          {
            name: 'Lorem Ipsum',
            descricao: 'Lorem Ipsum',
            status: 'Reprovado',
          },
        ],
      }
    },
    methods: {
      getColor (status) {
        if (status == "Reprovado") return 'red'
        if (status == "Em análise") return 'orange'
        if (status == "Em andamento") return 'blue'
        if (status == "Concluído") return 'green'
      },
    },
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
