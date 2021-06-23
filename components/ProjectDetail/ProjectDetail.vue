<template>
<div>
    <div class="breadcrubs">
        <div>Você esta aqui: </div> 
        <v-breadcrumbs :items="items" style="padding: 0px 0px 0px 10px">
        <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
        </template>
        </v-breadcrumbs>
    </div>

    <div class="client__project">
        {{ value.name }}
        <v-card flat>
            <template #[`item.status`]="{ item }">
                <v-chip :color="StatusColor[item.status]" class="white--text">
                {{ StatusText[item.status] }}
                </v-chip>
            </template>
        </v-card>
    </div>
    <div class="description">
        <v-card flat>
          <v-card-text style="padding: 0px; font-size: 14px; color: black">{{ value.description }}</v-card-text>
        </v-card>
    </div>
    <!-- <div class="description">{{ value.description }}</div> -->
    
    <div class="title">Dados do cliente</div>
    <div class="client__description">
        <v-card flat>
          <v-card-text style="padding: 0px; font-size: 14px; color: black">{{ value.client }}</v-card-text>
        </v-card>
    </div>
    <!-- <div class="client__description">{{ value.client }}</div> -->

    <div class="title">Grupo</div>
    <div class="client__grupo">
        <v-chip
            class="mt-2"
            color="primary"
            >
            Grupo dahora
        </v-chip>
    </div>

    <div class="title">Documentos</div>
    <div class="client__doc">
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
 </div>
</template>

<script lang="ts">
// Libs
import { defineComponent, ref, computed } from '@vue/composition-api'
import { ArchiveInput, ProjectInput } from '~/types'
import { ProjectService } from '@/services'
import { StatusText, StatusColor } from '@/helpers'
import { Filters, CoverCard } from '@/components/Projects'

export default defineComponent({
  name: 'ProjectDetail',
  components: {
    CoverCard,
    Filters,
  },
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
  setup() {
    const { setProjects } = useNamespacedActions<Actions>('projects', [
      'setProjects',
    ])
    const { projects, filter } = useNamespacedState<State>('projects', [
      'projects',
      'filter',
    ])

    const loading = ref(false)
    const search = ref('')
    const showSearch = ref(false)
    const showCreateStudent = ref(false)
    const showCreateAdmin = ref(false)

    const headers = [
      { text: 'Nome', value: 'name', sortable: true, align: 'left'},
      {
        text: 'Descrição',
        value: 'description',
        sortable: true,
        align: 'left',
        width: '30%',
      },
      { text: 'Status', value: 'status', sortable: true, align: 'left' },
      // { text: '', value: 'action', sortable: false, align: 'center' },
    ]

    const filteredProjects = computed(() => {
      return projects.value.filter((item) => {
        return filter.value.status.includes(item.status)
      })
    })

    const loadProjects = async () => {
      try {
        const service = new ProjectService()
        loading.value = true
        const _projects = await service.projects()
        await setProjects(_projects)
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    }

    loadProjects()
    return {
      projects,
      headers,
      loading,
      search,
      showSearch,
      showCreateStudent,
      StatusText,
      StatusColor,
      filteredProjects,
      showCreateAdmin,
    }
  },
  
  data: () => ({
      items: [
        {
          text: 'Projeto',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Detalhes',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    }),
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
