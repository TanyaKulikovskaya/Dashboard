<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="9">
        <v-row>
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="6"
            lg="6"
            xl="6"
            class="d-flex align-stretch"
          >
            <v-card elevation="0" class="py-4 px-3" width="100%" rounded>
              <v-card-title class="px-0 pt-0 pb-2">
                Choose call type
              </v-card-title>
              <v-chip-group v-model="filters.type" multiple column>
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
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="6"
            lg="6"
            xl="6"
            class="d-flex align-stretch"
          >
            <v-card elevation="0" class="py-4 px-3" width="100%" rounded>
              <v-card-title class="px-0 pt-0 pb-2">
                Choose call status
              </v-card-title>
              <v-chip-group v-model="filters.status" multiple column>
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
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="9">
        <v-card elevation="0" class="py-4 px-3" width="100%" rounded>
          <v-card-title class="px-0 pt-0 pb-2">
            Call list
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search sourse or destination"
              clearable
              hide-details
            >
            </v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="filteredCalls"
            :search="search"
            disable-pagination
            hide-default-footer
            fixed-header
          >
            <template v-slot:[`item.type`]="{ item }">
              <v-avatar
                :color="getColorByType(item.type)"
                size="26px"
                class="mr-2"
              >
                <v-icon small color="light">mdi-phone</v-icon>
              </v-avatar>
              {{ item.type | formattedTitle }}
            </template>
            <template v-slot:[`item.status`]="{ item }">
              <v-avatar
                :color="getColorByStatus(item.status)"
                size="26px"
                class="mr-2"
              >
                <v-icon small color="light">mdi-phone</v-icon>
              </v-avatar>
              {{ item.status | formattedTitle }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { headers, calls } from '@/data/mock-table'

export default {
  data: () => ({
    search: '',
    headers,
    calls,
    filters: {
      type: [],
      status: [],
    },
    typesStatuses: {
      incoming: ['answered', 'unanswered'],
      outcoming: ['answered', 'unanswered', 'diverted'],
    },
    typeColors: {
      incoming: 'blue',
      outcoming: 'green',
    },
    statusColors: {
      answered: 'green',
      unanswered: 'red',
      diverted: 'orange',
    },
  }),
  computed: {
    types() {
      return Object.keys(this.typesStatuses)
    },
    statuses() {
      if (this.filters.type.includes('outcoming')) {
        return this.typesStatuses.outcoming
      } else {
        return this.typesStatuses.incoming
      }
    },
    filteredCalls() {
      return this.calls.filter((call) => {
        return Object.keys(this.filters).every((filter) => {
          return (
            this.filters[filter].length < 1 ||
            this.filters[filter].includes(call[filter])
          )
        })
      })
    },
  },
  methods: {
    getColorByType(type) {
      return this.typeColors[type]
    },
    getColorByStatus(status) {
      return this.statusColors[status]
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

.v-input {
  max-width: 360px !important;
}
</style>
