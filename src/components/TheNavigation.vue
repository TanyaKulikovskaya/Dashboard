<template>
  <div>
    <v-toolbar fixed color="light" elevation="0" height="78">
      <v-toolbar-title>Your Logo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-list class="hidden-sm-and-down" color="light">
        <v-list-item-group class="d-flex">
          <v-list-item
            v-for="({ icon, text, href }, i) in items"
            :key="i"
            :to="href"
            class="px-1 mx-5"
          >
            <v-list-item-icon class="mr-1">
              <v-icon small>{{ icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ text | formattedTitle }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        color="dark"
        @click.stop="drawer = !drawer"
      >
      </v-app-bar-nav-icon>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" temporary app right color="dark">
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
.v-toolbar {
  &__title {
    color: $dark !important;
  }
  &__content {
    .v-list {
      .v-list-item {
        color: $dark !important;
        .v-icon {
          color: $dark !important;
        }
      }
      .v-list-item--active {
        border-bottom: 2px solid $warning;
        color: $warning !important;
        &:before {
          opacity: 0;
        }
        .v-icon {
          color: $warning !important;
        }
      }
      .v-list-item:hover {
        &:before {
          opacity: 0;
        }
      }
    }
  }
}

.v-navigation-drawer {
  &__content {
    .v-list-item {
      color: $light !important;
      .v-icon {
        color: $light !important;
      }
    }
    .v-list-item--active {
      border-right: 4px solid $warning;
      color: $warning !important;
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
</style>
