<template>
  <v-navigation-drawer :mini-variant.sync="mini" absolute color="#F5F5F7">
    
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <img src="@/assets/img/icon.svg" alt="">
      </v-list-item-avatar>
      <v-list-item-title>
        <h5>Fabrica de software</h5>
      </v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item class="mt" v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template #append>
      <div>
        <v-list-item @click="handleLogout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { SidebarItem } from '@/types'

import { UserRole } from '@/enum'

import { useNamespacedActions } from 'vuex-composition-helpers'

import { Actions } from '@/store/config'

export default defineComponent({
  props: {
    items: {
      type: Array as () => SidebarItem[],
      required: true,
    },
  },

  setup() {
    const mini = ref(true)

    const { logout } = useNamespacedActions<Actions>('config', ['logout'])

    const handleLogout = async () => {
      await logout()
    }

    return {
      UserRole,
      mini,
      handleLogout,
    }
  },
})
</script>
<style lang="scss" scoped>
@import './style.scss';

.mt{
  margin-top: 16px;
}
</style>
