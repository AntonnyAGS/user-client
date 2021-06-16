<template>
  <!-- <div class="dashboard">Em breve</div> -->
  <div class="flex">
    <div class="welcome">
      <h1>Bem Vindo!</h1>
      <div class="info-welcome">
        <p>
          Aqui você consegue ter acesso ao seu projeto, poderá acompanhar o
          status dele, e após a finalização você poderá avaliá-lo. E também pode
          adicionar novos projetos.
        </p>
        <img src="@/assets/img/welcome.png" alt="" />
      </div>
    </div>

    <div v-if="project && projects" class="projects">
      <div class="line-cards">
        <div class="card1">
          <h1>
            {{
              formatNumber(filteredProjects(ProjectStatus.APPROVED).length, 2)
            }}
          </h1>
          <p>
            Projetos <br />
            aprovados
          </p>
        </div>
        <div class="card">
          <h1>{{ formatNumber(projects.length, 2) }}</h1>
          <p>Projetos cadastrados</p>
        </div>
        <div class="card">
          <h1>
            {{
              formatNumber(filteredProjects(ProjectStatus.REPROVED).length, 2)
            }}
          </h1>
          <p>Projetos reprovados</p>
        </div>
      </div>

      <div class="progress-card">
        <div class="info-proj">
          <h2>{{ project.name }}</h2>
          <v-stepper
            alt-labels
            style="box-shadow: 0px 0px 0px 0px !important; background: #f5f5f7"
          >
            <v-stepper-header>
              <v-stepper-step
                step=""
                style="padding: 24px 0px 24px 0px"
                :complete="true"
                :complete-icon="
                  project.status === ProjectStatus.DOING ||
                  project.status === ProjectStatus.FINISHED
                    ? 'mdi-checkbox-marked-circle-outline'
                    : 'mdi-checkbox'
                "
              >
                Em análise
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                step=""
                style="padding: 24px 0px 24px 0px"
                :complete="
                  project.status === ProjectStatus.DOING ||
                  project.status === ProjectStatus.FINISHED
                "
                :complete-icon="
                  project.status === ProjectStatus.FINISHED
                    ? 'mdi-checkbox-marked-circle-outline'
                    : 'mdi-checkbox'
                "
              >
                Em andamento
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                step=""
                style="padding: 24px 0px 24px 0px"
                :complete="project.status === ProjectStatus.FINISHED"
                complete-icon="mdi-checkbox-marked-circle-outline"
              >
                Concluído
              </v-stepper-step>
            </v-stepper-header>
          </v-stepper>
          <!-- <div class="container">
            <ul class="progressbar">
                <li class="active">Em Análise</li>
                <li>Em Andamento</li>
                <li>Comcluído</li>
            </ul>
          </div> -->
          <p>
            <v-icon style="margin-right: 2px">mdi-phone</v-icon> Alguma dúvida?
            Entre em contato com a equipe <a href="">aqui.</a>
          </p>
        </div>

        <div
          class="progress-circular-container"
          :style="{ 'background-color': StatusColor[project.status] }"
        >
          <v-progress-circular
            :rotate="360"
            :size="100"
            :width="15"
            :value="getProgress(project)"
            :color="StatusColor[project.status]"
          >
            <span
              class="white--text"
              style="font-weight: 600; font-size: 1.3rem"
            >
              {{ getDiffDays(project) }}
            </span>
          </v-progress-circular>
        </div>
      </div>

      <div class="idea">
        <div class="idea-text">
          <h2>Surgiu uma ideia?</h2>
          <p>Clique no botão abaixo e cadastre um novo projeto.</p>
          <v-btn link color="primary" to="/create-project">
            CADASTRAR NOVO PROJETO +
          </v-btn>
        </div>
        <img src="@/assets/img/ideia.png" alt="" class="img" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Libs
import { computed, defineComponent } from '@nuxtjs/composition-api'

import { useNamespacedState } from 'vuex-composition-helpers'

import { State } from '@/store/projects'
import { formatNumber, StatusColor } from '@/helpers'
import dayjs from 'dayjs'
import { useLoadProjects } from '~/hooks'
import { ProjectStatus } from '~/enum'
import { Project } from '~/types'

export default defineComponent({
  components: {},
  setup() {
    useLoadProjects()

    const { projects } = useNamespacedState<State>('projects', ['projects'])

    const project = computed(() => {
      if (!projects.value) {
        return null
      }
      return projects.value[projects.value.length - 1]
    })

    const filteredProjects = (status: ProjectStatus) => {
      return projects.value.filter((project) => project.status === status)
    }

    const getDiffDays = (project: Project): number => {
      if (!project) {
        return 0
      }
      const diffDays = dayjs().diff(dayjs(project.createdAt), 'days')
      return diffDays
    }
    const getProgress = (project: Project): number => {
      if (!project) {
        return 0
      }
      const diffDays = getDiffDays(project)
      const porcent = (diffDays * 100) / 30
      return porcent
    }

    return {
      project,
      projects,
      formatNumber,
      filteredProjects,
      ProjectStatus,
      getDiffDays,
      getProgress,
      StatusColor,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './style.scss';
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@500&display=swap');

.welcome {
  h1 {
    text-align: center;
    color: #000;
  }
  font-family: 'Baloo Bhai 2', cursive;
  display: block;
  width: 40%;
  font-size: 18px;
  color: #9fa2b4;
  margin-right: 80px;
  @media screen and (max-width: 900px) {
    margin-right: 0;
    width: 100%;
  }
}
.info-welcome {
  display: block;
  @media screen and (max-width: 900px) {
    img {
      text-align: center;
      height: 250px;
      width: 300px;
    }
  }
}
@media screen and (max-width: 900px) {
  .info-welcome {
    text-align: center;
  }
}
.projects {
  display: block;
  .line-cards {
    // margin-left: 50px;
    h1 {
      margin-left: 10px;
      margin-right: 20px;
      margin-top: auto;
      margin-bottom: auto;
    }
    p {
      margin-top: auto;
      margin-bottom: auto;
    }
    display: flex;
    @media screen and (max-width: 600px) {
      margin-left: 0px;
      display: block;
      text-align: center;
    }
  }
}
.card1 {
  background-color: #f5f5f7;
  border-radius: 10px;
  display: flex;
  padding: 8px;
  width: 203px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  h1 {
    font-size: 40px;
  }
  @media screen and (max-width: 600px) {
    margin-left: 0px;
    margin-top: 15px;
    width: 100%;
  }
}
.card {
  background-color: #f5f5f7;
  border-radius: 10px;
  display: flex;
  padding: 8px;
  width: 203px;
  margin-left: 3%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  h1 {
    font-size: 40px;
  }
  @media screen and (max-width: 600px) {
    margin-left: 0px;
    margin-top: 15px;
    width: 100%;
  }
}
.flex {
  @media screen and (max-width: 900px) {
    display: block;
    margin-left: 0px;
  }
  display: flex;
  margin-left: 7%;
  font-family: 'Baloo Bhai 2', cursive;
}

.progress-card {
  padding: 30px;
  display: flex;
  margin-top: 20px;
  background-color: #f5f5f7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  @media screen and (max-width: 600px) {
    display: block;
  }

  .info-proj {
    h2 {
      text-align: center;
    }
    p {
      width: 400px;
      font-size: 15px;
      margin-top: 15px;
      @media screen and (max-width: 600px) {
        width: 100%;
      }
    }
    a {
      text-decoration: none;
      color: #ff9700;
    }

    // margin-right: 10px;
    display: block;
  }
  .circular {
    @media screen and (max-width: 600px) {
      margin-left: 33%;
    }
  }
}
.idea {
  display: flex;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #f5f5f7;
  padding: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 600px) {
    display: block;
  }
  @media screen and (max-width: 600px) {
    .img {
      margin-top: 10%;
      height: 150px;
      width: 120px;
      margin-left: 25%;
    }
  }
  .idea-text {
    margin-right: 30px;
    width: 100%;
    @media screen and (max-width: 600px) {
      text-align: center;
    }
    @media screen and (max-width: 900px) {
      text-align: center;
    }
    h2 {
      font-weight: bold;
    }
    p {
      font-size: 20px;
      width: 100%;
      @media screen and (max-width: 600px) {
        width: 100%;
        text-align: center;
        margin-top: 10%;
      }
    }
    button {
      color: #fff;
      background-color: #ff9700;
      padding: 10px;
      border-radius: 10px;
      @media screen and (max-width: 600px) {
        width: 100%;
      }
    }
  }
}
</style>
