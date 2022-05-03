<template>
  <div>
    <v-app-bar app elevation="0">
      <v-app-bar-nav-icon
        v-if="!$vuetify.breakpoint.lgAndUp"
        @click.stop="drawer = !drawer"
        color="dark"
      >
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn icon class="mr-4">
        <v-icon color="dark">mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="dark">mdi-cog-outline</v-icon>
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
              <v-list-item-title class="text-h6">
                {{ text | formattedTitle }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { icon: 'mdi-view-dashboard', text: 'call history', href: '/dashboard' },
      { icon: 'mdi-poll', text: 'analytics', href: '/analytics' },
      { icon: 'mdi-cog', text: 'setting', href: '/settings' },
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
.v-app-bar.v-toolbar.v-sheet {
  background-color: $light !important;
}

.v-list {
  padding: 0 !important;
}

.v-list-item__content {
  padding: 18px 0 !important;
}

.v-navigation-drawer {
  .v-navigation-drawer__content {
    .v-list {
      .v-list-item {
        color: $light !important;
        .v-icon {
          color: $light !important;
        }
      }
      .v-list-item--active {
        color: $warning !important;
        border-left: 4px solid $warning;
        &:before {
          opacity: 0;
        }
        .v-icon {
          color: $warning !important;
        }
      }
      .v-list-item:hover {
        &:before {
          opacity: 0.08;
        }
      }
    }
  }
}
</style>
