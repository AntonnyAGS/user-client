<template>
  <!-- <div class="dashboard">Em breve</div> -->
  <div class="flex">
    <div class="welcome">
      <h1>Bem Vindo!</h1>
      <div class="info-welcome">
        <p>Aqui você consegue ter acesso ao seu projeto, poderá acompanhar o status dele, 
          e após a finalização você poderá avaliá-lo. E também pode adicionar novos projetos.</p>
        <img src="@/assets/img/welcome.png" alt="">
      </div>
    </div>

    <div class="projects">
      <div class="line-cards">
        <div class="card1">
          <h1>03</h1>
          <p>Projetos <br> aprovados</p>
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
          <v-stepper alt-labels
          style="box-shadow: 0px 0px 0px 0px !important; background: #f5f5f7;">
            <v-stepper-header>
              <v-stepper-step step="" style="padding: 24px 0px 24px 0px;">
                Em análise
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="" style="padding: 24px 0px 24px 0px;">
                Em andamento
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="" style="padding: 24px 0px 24px 0px;">
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
          <p><v-icon style="margin-right: 2px">mdi-phone</v-icon> Alguma dúvida?  Entre em contato com a equipe <a href="">aqui.</a></p>
        </div>
        <v-progress-circular
            class="circular"
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
          <button>
            CADASTRAR NOVO PROJETO +
          </button>
        </div>
        <img src="@/assets/img/ideia.png" alt="" class="img">
      </div>
    </div>

  </div>

  
</template>

<script lang="ts">
// Libs
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
    components: {},
    data() {
      return {
        interval: {},
        value: 30,
      }
    },
    setup() {}
})
</script>

<style lang="scss" scoped>
@import './style.scss';
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@500&display=swap');

.welcome{
  h1{
    text-align: center;
    color: #000;
  }
  font-family: 'Baloo Bhai 2', cursive;
  display: block;
  width: 40%;
  font-size: 18px;
  color: #9FA2B4;
  margin-right: 80px;
  @media screen and (max-width: 900px) {
    margin-right: 0;
    width: 100%;
  }

}
.info-welcome{
  display: block;
  @media screen and (max-width: 900px) {
    img{
      text-align: center;
      height: 250px;
      width: 300px;
    }
  }
}
@media screen and (max-width: 900px) {
    .info-welcome{
      text-align: center;
    }
  }
.projects{
  display: block;
  .line-cards{
    // margin-left: 50px;
    h1{
      margin-left: 10px;
      margin-right: 20px;
      margin-top: auto;
      margin-bottom: auto;
    }
    p{
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
.card1{
  background-color: #F5F5F7;
  border-radius: 10px;
  display: flex;
  padding: 8px;
  width: 203px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  h1{
    font-size: 40px;
  }
  @media screen and (max-width: 600px) {
    margin-left: 0px;
    margin-top: 15px;
    width: 100%;
  }
}
.card{
  background-color: #F5F5F7;
  border-radius: 10px;
  display: flex;
  padding: 8px;
  width: 203px;
  margin-left: 3%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  h1{
    font-size: 40px;
  }
  @media screen and (max-width: 600px) {
    margin-left: 0px;
    margin-top: 15px;
    width: 100%;
  }
}
.flex{
  @media screen and (max-width: 900px) {
    display: block;
    margin-left: 0px;
  }
  display: flex;
  margin-left: 7%;
  font-family: 'Baloo Bhai 2', cursive;
}

.progress-card{
  padding: 30px;
  display: flex;
  margin-top: 20px;
  background-color: #F5F5F7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  @media screen and (max-width: 600px) {
    display: block;
  }

  .info-proj{
    h2{
      text-align: center;
    }
    p{
      width: 400px;
      font-size: 15px;
      margin-top: 15px;
      @media screen and (max-width: 600px) {
        width: 100%;
      }
    }  
    a{
      text-decoration:none;
      color: #FF9700;
    }
    
    // margin-right: 10px;
    display: block;
  }
  .circular{
    @media screen and (max-width: 600px) {
      margin-left: 33%;
    }
  }
}
.idea{
  display: flex;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #F5F5F7;
  padding: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 600px) {
    display: block;
  }
  @media screen and (max-width: 600px) {
    .img{
      margin-top: 10%;
      height: 150px;
      width: 120px;
      margin-left: 25%;
    }
  }
    .idea-text{
      margin-right: 30px;
      width: 100%;
      @media screen and (max-width: 600px) {
        text-align: center;
      }
      @media screen and (max-width: 900px) {
        text-align: center;
      }
      h2{
        font-weight: bold;
      }
      p{
        font-size: 20px;
        width: 100%;
        @media screen and (max-width: 600px) {
          width: 100%;
          text-align: center;
          margin-top: 10%;
        }
        
      }
      button{
        color: #FFF;
        background-color: #FF9700;
        padding: 10px;
        border-radius: 10px;
        @media screen and (max-width: 600px) {
          width: 100%;
        }
      }
    }
  }
</style>
