<template>
  <v-app>
    <side-bar :items="items" />
    <v-main>
      <v-container fluid class="main-container fill-height">
        <nuxt />
        <notifications ignore-duplicates class="notification" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
// Libs
import { defineComponent, ref } from '@nuxtjs/composition-api'

// Components
import SideBar from '@/components/Sidebar'

// Types
import { SidebarItem } from '@/types'

export default defineComponent({
  name: 'Layout',

  components: {
    SideBar,
  },
  middleware: 'isAuthenticated',

  setup() {
    const items = ref<SidebarItem[]>([
      { to: '/dashboard', icon: 'mdi-home', title: 'home' },
    ])

    return {
      items,
    }
  },
})
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';
@import '@/assets/variables.scss';
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
  // Style for title line
  font-size: 14px;
  text-transform: uppercase;
  // border: 1px solid white;
}

.notification-content {
  font-size: 16px;
}
html {
  overflow-y: auto !important;
  box-sizing: border-box;
  font-size: 14px;
}

.main-container {
  padding: $LAYOUT_PADDING !important;
}

@media #{map-get($display-breakpoints, 'lg-and-up')} {
  html {
    font-size: 16px;
  }
  .main-container {
    padding: $LAYOUT_PADDING * 3 !important;
  }
}
</style>
<style lang="scss" scoped>
.v-application {
  font-family: Montserrat !important;
}
</style>
