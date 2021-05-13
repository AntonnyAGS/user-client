<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0 fill-height">
        <nuxt />
        <notifications ignore-duplicates class="notification" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Unauthorized',
  middleware: 'isNotAuthenticated',
})
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';
.notification {
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
}
.vue-notification {
  border-radius: 4px;
  font-family: Montserrat;
  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }
  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }
  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }
}
.notification-title {
  font-size: 14px;
  text-transform: uppercase;
}

.notification-content {
  font-size: 16px;
}
html {
  overflow-y: auto !important;
  overflow-x: hidden;
  font-size: 16px !important;
}
@media #{map-get($display-breakpoints, 'md-and-down')} {
  html {
    font-size: 14px !important;
  }
}
</style>
<style lang="scss" scoped>
.v-application {
  font-family: Montserrat !important;
}
</style>
