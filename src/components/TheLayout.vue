<template>
  <v-app>
    <the-navigation />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheNavigation from './TheNavigation.vue'

export default {
  components: { TheNavigation },
}
</script>
