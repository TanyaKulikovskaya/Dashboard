<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="3" xl="3">
        <v-card elevation="0" class="py-4 px-3" rounded>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="12" xl="12">
              <v-card-title class="px-0 pt-0 pb-2">
                Choose call type
              </v-card-title>
              <v-chip-group v-model="filters.type" multiple column>
                <v-chip
                  v-for="type in types"
                  :key="type"
                  :value="type"
                  filter
                  label
                  :class="`${type}`"
                >
                  {{ type }}
                </v-chip>
              </v-chip-group>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="12" xl="12">
              <v-card-title class="px-0 pt-0 pb-2">
                Choose call status
              </v-card-title>
              <v-chip-group v-model="filters.status" multiple column>
                <v-chip
                  v-for="status in statuses"
                  :key="status"
                  :value="status"
                  filter
                  label
                  :class="`${status}`"
                >
                  {{ status }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="12" lg="9" xl="9">
        <v-card elevation="0" class="py-4 px-3" width="100%" rounded>
          <v-card-title class="d-flex px-2 pt-0 pb-6">
            Call list
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search sourse or destination"
              background-color="purplelight"
              color="purpledark"
              dense
              clearable
              filled
              rounded
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
            height="416px"
          >
            <template v-slot:[`item.type`]="{ item }">
              <v-avatar
                :color="getColorByType(item.type)"
                size="26px"
                class="hidden-sm-and-down mr-2"
              >
                <v-icon small color="light">mdi-phone</v-icon>
              </v-avatar>
              <span
                :class="
                  $vuetify.breakpoint.smAndDown ? `text-${item.type}` : ''
                "
              >
                {{ item.type | formattedTitle }}
              </span>
            </template>
            <template v-slot:[`item.status`]="{ item }">
              <v-avatar
                :color="getColorByStatus(item.status)"
                size="26px"
                class="hidden-sm-and-down mr-2"
              >
                <v-icon small color="light">mdi-phone</v-icon>
              </v-avatar>
              <span
                :class="
                  $vuetify.breakpoint.smAndDown ? `text-${item.status}` : ''
                "
              >
                {{ item.status | formattedTitle }}
              </span>
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
      incoming: 'primary',
      outcoming: 'info',
    },
    statusColors: {
      answered: 'info',
      unanswered: 'error',
      diverted: 'warning',
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
    color: $primary;
    border-color: $primary;
  }
  &.outcoming,
  &.answered {
    color: $info;
    border-color: $info;
  }
  &.unanswered {
    color: $error;
    border-color: $error;
  }
  &.diverted {
    color: $warning;
    border-color: $warning;
  }
}

.v-chip--active {
  color: $light !important;
  &.incoming {
    background: $primary !important;
  }
  &.outcoming,
  &.answered {
    background: $info !important;
  }
  &.unanswered {
    background: $error !important;
  }
  &.diverted {
    background: $warning !important;
  }
  .v-icon {
    color: $light !important;
  }
}

.v-input {
  max-width: 360px !important;
}

.text-incoming {
  color: $primary;
}
.text-outcoming,
.text-answered {
  color: $info;
}
.text-unanswered {
  color: $error;
}
.text-diverted {
  color: $warning;
}
</style>
