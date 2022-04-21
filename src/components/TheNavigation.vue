<template>
  <v-layout>
    <v-app-bar app elevation="0">
      <v-app-bar-nav-icon
        v-if="!$vuetify.breakpoint.lgAndUp"
        @click.stop="drawer = !drawer"
      >
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :permanent="$vuetify.breakpoint.lgAndUp"
      color="dark"
      app
    >
      <v-list>
        <v-list-item-group v-model="group">
          <v-list-item
            v-for="({ icon, text, href }, i) in items"
            :key="i"
            :to="href"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { icon: 'mdi-view-dashboard', text: 'Dashboard', href: '/dashboard' },
      { icon: 'mdi-poll', text: 'Analytics', href: '/analytics' },
      { icon: 'mdi-cog', text: 'Setting', href: '/settings' },
    ],
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>

<style lang="scss" scoped>
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #fff9e9 !important;
}

.v-list {
  padding: 0 !important;
}

.theme--light.v-list-item--active:before,
.theme--light.v-list-item--active:hover:before,
.theme--light.v-list-item:focus:before {
  opacity: 0 !important;
}

.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled),
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled)
  .v-icon {
  color: #fff9e9 !important;
}

.v-list-item-group .v-list-item--active {
  color: #efa500 !important;
}
</style>
