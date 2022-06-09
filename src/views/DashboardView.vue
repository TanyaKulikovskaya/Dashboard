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
            <v-col cols="12" sm="6" md="6" lg="12" xl="12">
              <date-range-picker
                ref="picker"
                v-model="datePickerSettings.dateRange"
                :ranges="datePickerSettings.ranges"
                :locale-data="datePickerSettings.locale"
                :timePicker="datePickerSettings.timePicker"
                :time-picker-increment="datePickerSettings.timePickerIncrement"
                :opens="datePickerSettings.opens"
              >
              </date-range-picker>
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
            :items="resultCalls"
            :search="search"
            disable-pagination
            hide-default-footer
            fixed-header
            height="416px"
          >
            <template v-slot:[`item.date`]="{ item }">
              <span>
                {{
                  new Intl.DateTimeFormat('ru-RU', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  }).format(new Date(item.date))
                }}
              </span>
            </template>
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

import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  components: {
    DateRangePicker,
  },
  data() {
    return {
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
      datePickerSettings: {
        dateRange: {
          startDate: '',
          endDate: '',
        },
        ranges: {},
        locale: {
          format: 'dd.mm.yyyy',
          separator: ' - ',
          applyLabel: 'Найти',
          cancelLabel: 'Отмена',
          weekLabel: 'W',
          customRangeLabel: 'Custom Range',
          daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          monthNames: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
          ],
          firstDay: 1,
        },
        opens: 'right',
        timePicker: true,
        timePickerIncrement: 30,
      },
    }
  },
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
    sortedByTimestampCalls() {
      return [...this.calls].sort((a, b) => b.date - a.date)
    },
    filteredCalls() {
      return this.sortedByTimestampCalls.filter((call) => {
        return Object.keys(this.filters).every((filter) => {
          return (
            this.filters[filter].length < 1 ||
            this.filters[filter].includes(call[filter])
          )
        })
      })
    },
    resultCalls() {
      const start = new Date(
        this.datePickerSettings.dateRange.startDate
      ).getTime()
      const end = new Date(this.datePickerSettings.dateRange.endDate).getTime()
      return this.filteredCalls.filter(
        (call) => call.date >= start && call.date <= end
      )
    },
  },
  mounted() {
    this.createRanges()
  },
  methods: {
    getColorByType(type) {
      return this.typeColors[type]
    },
    getColorByStatus(status) {
      return this.statusColors[status]
    },
    createRanges() {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // eslint-disable-next-line prefer-const
      let yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)
      yesterday.setHours(0, 0, 0, 0)

      // eslint-disable-next-line prefer-const
      let days6 = new Date()
      days6.setDate(today.getDate() - 6)
      days6.setHours(0, 0, 0, 0)

      // eslint-disable-next-line prefer-const
      let ranges = {
        'Сегодня ': [today, today],
        'Вчера ': [yesterday, yesterday],
        'Последние 7 дней': [days6, today],
        'Текущий месяц': [
          new Date(today.getFullYear(), today.getMonth(), 1),
          today,
        ],
        'Прошлый месяц': [
          new Date(today.getFullYear(), today.getMonth() - 1, 1),
          new Date(today.getFullYear(), today.getMonth(), 0),
        ],
      }
      this.datePickerSettings.dateRange.startDate = new Date(1647339359000)
      this.datePickerSettings.dateRange.endDate = today
      this.datePickerSettings.ranges = ranges
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
