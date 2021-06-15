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

    <div class="projects">
      <div class="line-cards">
        <div class="card">
          <h1>03</h1>
          <p>Projetos aprovados</p>
        </div>
        <div class="card">
          <h1>03</h1>
          <p>Projetos cadastrados</p>
        </div>
        <div class="card">
          <h1>03</h1>
          <p>Projetos reprovados</p>
        </div>
      </div>

      <div class="progress-card">
        <div class="info-proj">
          <h2>Site da Padaria Bella SP</h2>
          <!-- <div class="container">
            <ul class="progressbar">
                <li class="active">Em Análise</li>
                <li>Em Andamento</li>
                <li>Comcluído</li>
            </ul>
          </div> -->
          <p>
            <v-icon class="mr-2">mdi-phone</v-icon>Alguma dúvida? Entre em
            contato com a equipe <a href="">aqui.</a>
          </p>
        </div>
        <v-progress-circular
          :rotate="360"
          :size="100"
          :width="15"
          :value="value"
          color="#FF9700"
        >
          30%
        </v-progress-circular>
      </div>

      <div class="idea">
        <div class="idea-text">
          <h2>Surgiu uma ideia?</h2>
          <p>Clique no botão abaixo e cadastre um novo projeto.</p>
          <button>CADASTRAR NOVO PROJETO +</button>
        </div>
        <img src="@/assets/img/ideia.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Libs
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
  setup() {},
  data() {
    return {
      interval: {},
      value: 30,
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
}
.info-welcome {
  display: block;
}
.projects {
  display: block;
  .line-cards {
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
  }
}
.card {
  background-color: #f5f5f7;
  border-radius: 15px;
  padding: 5px;
  display: flex;
  width: 170px;
  margin-left: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.flex {
  min-width: 100% !important;
  display: flex;
  flex-shrink: 0;
  font-family: 'Baloo Bhai 2', cursive;
}

.progress-card {
  padding: 30px;
  display: flex;
  gap: 16px;
  margin-top: 20px;
  background-color: #f5f5f7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  .info-proj {
    p {
      width: 350px;
      font-size: 15px;
      margin-top: 15px;
    }
    a {
      text-decoration: none;
      color: #ff9700;
    }
    // margin-right: 10px;
    display: block;
  }
}

.idea {
  display: flex;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #f5f5f7;
  padding: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  .idea-text {
    margin-right: 30px;
    width: 80%;
    h2 {
      font-weight: bold;
    }
    p {
      font-size: 20px;
      width: 300px;
    }
    button {
      color: #fff;
      background-color: #ff9700;
      padding: 10px;
      border-radius: 10px;
    }
  }
}

// .container {
//     width: 500px;

//     //margin: 100px auto;
// }
// .progressbar {
//     // counter-reset: step;
// }
// .progressbar li {
//     // margin-right: 20px;
//     list-style-type: none;
//     width: 25%;
//     float: left;
//     font-size: 12px;
//     position: relative;
//     text-align: center;
//     text-transform: uppercase;
//     color: #7d7d7d;
// }
// .progressbar li:before {
//     width: 40px;
//     height: 40px;
//     content: counter(step);
//     counter-increment: step;
//     line-height: 30px;
//     border: 2px solid #7d7d7d;
//     display: block;
//     text-align: center;
//     margin: 0 auto 10px auto;
//     border-radius: 50%;
//     background-color: white;
// }
// .progressbar li:after {
//     width: 100%;
//     height: 2px;
//     content: '';
//     position: absolute;
//     background-color: #7d7d7d;
//     top: 15px;
//     left: -50%;
//     z-index: -1;
// }
// .progressbar li:first-child:after {
//     content: none;
// }
// .progressbar li.active {
//     color: #FF9700;
// }
// .progressbar li.active:before {
//     border-color: #FF9700;
// }
// .progressbar li.active + li:after {
//     background-color: #FF9700;
// }
</style>
