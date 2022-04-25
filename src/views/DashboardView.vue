<template>
  <v-container fluid>
    <v-row>
      <v-col cols="9">
        <v-row>
          <v-col cols="6">
            <v-card elevation="0" class="py-4 px-3" min-height="180">
              <v-card-title class="px-0 pt-0 pb-2">
                Choose call type
              </v-card-title>
              <v-chip-group v-model="selectedTypes" multiple column>
                <v-chip
                  v-for="type in types"
                  :key="type"
                  :value="type"
                  filter
                  large
                  :class="`${type}`"
                >
                  {{ type }}
                </v-chip>
              </v-chip-group>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card elevation="0" class="py-4 px-3" min-height="180">
              <v-card-title class="px-0 pt-0 pb-2">
                Choose call status
              </v-card-title>
              <v-chip-group v-model="selectedStatuses" multiple column>
                <v-chip
                  v-for="status in statuses"
                  :key="status"
                  :value="status"
                  filter
                  large
                  :class="`${status}`"
                >
                  {{ status }}
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
.v-chip:not(.v-chip--active) {
  background: transparent !important;
  border-width: 1px;
  border-style: solid;
}

.v-chip {
  text-transform: uppercase;
  font-weight: 500;
  &.incoming {
    color: #3cbcc3;
    border-color: #3cbcc3;
  }
  &.outcoming,
  &.answered {
    color: #438945;
    border-color: #438945;
  }
  &.unanswered {
    color: #e40c2b;
    border-color: #e40c2b;
  }
  &.diverted {
    color: #eba63f;
    border-color: #eba63f;
  }
}

.v-chip--active {
  color: #f7f4e9 !important;
  &.incoming {
    background: #3cbcc3 !important;
  }
  &.outcoming,
  &.answered {
    background: #438945 !important;
  }
  &.unanswered {
    background: #e40c2b !important;
  }
  &.diverted {
    background: #eba63f !important;
  }
  .v-icon {
    color: #f7f4e9 !important;
  }
}
</style>
