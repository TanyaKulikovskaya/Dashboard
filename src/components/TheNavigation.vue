<template>
  <div>
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
      { icon: 'mdi-view-dashboard', text: 'dashboard', href: '/dashboard' },
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
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #fff9e9 !important;
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
        color: #fff9e9 !important;
        .v-icon {
          color: #fff9e9 !important;
        }
      }
      .v-list-item--active {
        color: #efa500 !important;
        border-left: 4px solid #efa500;
        &:before {
          opacity: 0;
        }
        .v-icon {
          color: #efa500 !important;
        }
      }
      .v-list-item:hover {
        color: #efa500 !important;
        &:before {
          opacity: 0;
        }
        .v-icon {
          color: #efa500 !important;
        }
      }
    }
  }
}
</style>
