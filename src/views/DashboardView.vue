<template>
  <v-container fluid>
    <v-row>
      <v-col cols="9">
        <v-row>
          <v-col cols="6">
            <v-card elevation="6" class="py-4 px-3">
              <v-card-title class="px-0 pt-0 pb-2"
                >Choose call type</v-card-title
              >
              <v-chip-group
                v-model="selectedTypes"
                multiple
                column
                active-class="success--text"
              >
                <v-chip v-for="type in types" :key="type" :value="type" filter>
                  {{ type | formattedTitle }}
                </v-chip>
              </v-chip-group>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card elevation="6" class="py-4 px-3">
              <v-card-title class="px-0 pt-0 pb-2"
                >Choose call status</v-card-title
              >
              <v-chip-group
                v-model="selectedStatuses"
                multiple
                column
                active-class="success--text"
              >
                <v-chip
                  v-for="status in statuses"
                  :key="status"
                  :value="status"
                  filter
                >
                  {{ status | formattedTitle }}
                </v-chip>
              </v-chip-group>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    selectedTypes: [],
    selectedStatuses: [],
    typesStatuses: {
      incoming: ['answered', 'unanswered'],
      outcoming: ['answered', 'unanswered', 'diverted'],
    },
  }),
  computed: {
    types() {
      return Object.keys(this.typesStatuses)
    },
    statuses() {
      if (this.selectedTypes.includes('outcoming')) {
        return this.typesStatuses.outcoming
      } else {
        return this.typesStatuses.incoming
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.v-chip {
  background: transparent !important;
  color: #161b40 !important;
  border: 1px solid #161b40 !important;
}
.v-chip--active {
  background: #161b40 !important;
  opacity: 0.6 !important;
  color: #fff9e9 !important;
  .v-icon {
    color: #fff9e9 !important;
  }
}
</style>
