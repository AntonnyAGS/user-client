<template>
  <div class="create-account">
    <div class="create-account__container">
      <stepper :user.sync="user" :project.sync="project" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import { Stepper } from '@/components/CreateAccount'

import { UserInput, ProjectInput } from '@/types'

export default defineComponent({
  components: {
    Stepper,
  },
  layout: 'unauthorized',

  setup() {
    const showPassword = ref(false)

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

    return { showPassword, user, project }
  },
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
