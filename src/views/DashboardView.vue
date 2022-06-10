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
                Choose call type
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
              <v-card-title class="px-0 pt-0 pb-4">
                Choose date range
              </v-card-title>
              <date-range-picker
                ref="picker"
                v-model="datePickerSettings.dateRange"
                :max-date="datePickerSettings.maxDate"
                :min-date="datePickerSettings.minDate"
                :ranges="datePickerSettings.ranges"
                :locale-data="datePickerSettings.locale"
                :timePicker="datePickerSettings.timePicker"
                :time-picker-increment="datePickerSettings.timePickerIncrement"
                :opens="datePickerSettings.opens"
              >
                <template v-slot:input="picker">
                  <v-icon color="dark" class="mr-2">mdi-calendar</v-icon>
                  {{ picker.startDate | date }} - {{ picker.endDate | date }}
                </template>
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
        minDate: '',
        maxDate: '',
        ranges: {},
        locale: {
          format: 'dd.mm.yyyy',
          separator: ' - ',
          applyLabel: 'Apply',
          cancelLabel: 'Cancel',
          weekLabel: 'W',
          customRangeLabel: 'Custom Range',
          daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          monthNames: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          firstDay: 1,
        },
        opens: 'right',
        timePicker: true,
        timePickerIncrement: 15,
      },
    }
  },
  filters: {
    date(value) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      return value ? value.toLocaleString('ru-RU', options) : ''
    },
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
      const todayStart = new Date()
      todayStart.setHours(0, 0, 0, 0)
      const todayEnd = new Date()
      todayEnd.setHours(23, 59, 59, 0)

      const yesterdayStart = new Date()
      yesterdayStart.setDate(todayStart.getDate() - 1)
      yesterdayStart.setHours(0, 0, 0, 0)
      const yesterdayEnd = new Date()
      yesterdayEnd.setDate(todayEnd.getDate() - 1)
      yesterdayEnd.setHours(23, 59, 59, 0)

      const days6 = new Date()
      days6.setDate(todayStart.getDate() - 6)
      days6.setHours(0, 0, 0, 0)

      const thisMonthStart = new Date(
        todayStart.getFullYear(),
        todayStart.getMonth(),
        1
      )

      const lastMonthStart = new Date(
        todayStart.getFullYear(),
        todayStart.getMonth() - 1,
        1
      )
      const lastMonthEnd = new Date(
        todayStart.getFullYear(),
        todayStart.getMonth(),
        0
      )
      lastMonthEnd.setHours(23, 59, 59, 0)

      const ranges = {
        'Today ': [todayStart, todayEnd],
        'Yesterday ': [yesterdayStart, yesterdayEnd],
        'Last 7 days': [days6, todayEnd],
        'This month': [thisMonthStart, todayEnd],
        'Last month': [lastMonthStart, lastMonthEnd],
      }

      this.datePickerSettings.ranges = ranges

      const startDate = new Date(1647339359000)
      startDate.setDate(startDate.getDate())
      startDate.setHours(0, 0, 0, 0)

      this.datePickerSettings.dateRange.startDate = startDate
      this.datePickerSettings.dateRange.endDate = todayEnd
      this.datePickerSettings.minDate = startDate
      this.datePickerSettings.maxDate = todayEnd
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

<style lang="scss">
.reportrange-text {
  display: flex;
  align-items: center;
  padding: 6px 18px !important;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  border-color: $dark !important;
  border-radius: 4px;
  color: $dark;
  &:hover {
    background-color: $purplelight;
  }
}

.daterangepicker {
  padding: 8px 12px;
  background-color: $purplelight;
  border: none;
  &::before,
  &::after {
    display: none;
  }
}

.daterangepicker.show-ranges {
  min-width: 0 !important;
}

.daterangepicker .ranges ul {
  width: 100%;
}

.daterangepicker .ranges li {
  color: $dark;
  font-size: 14px;
  line-height: 18px;
  border-radius: 4px;
  &:hover {
    background-color: transparent;
    color: $secondary;
  }
}

.daterangepicker .ranges li.active {
  background-color: $secondary;
  color: white;
}

.daterangepicker.show-ranges .drp-calendar.left,
.daterangepicker .drp-buttons {
  border: none;
}

.daterangepicker .drp-calendar {
  padding: 12px !important;
}

.daterangepicker .calendars,
.daterangepicker .calendars-container {
  flex-direction: column;
}

.daterangepicker .calendar-table th {
  font-weight: normal !important;
}

.daterangepicker .calendar-table th.month {
  font-size: 16px;
}

.daterangepicker td.in-range {
  background-color: $light;
}

.daterangepicker td.active,
.daterangepicker td.active:hover {
  background-color: $dark;
}

.daterangepicker .calendar-time {
  margin-top: 8px;
}

.daterangepicker select.ampmselect,
.daterangepicker select.hourselect,
.daterangepicker select.minuteselect,
.daterangepicker select.secondselect {
  background: $purplelight;
  border: 1px solid $purpledark;
  border-radius: 4px;
  color: $purpledark;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
}

.daterangepicker.show-calendar .drp-buttons {
  display: flex;
  flex-direction: column;
}

.daterangepicker .drp-buttons {
  padding: 16px;
  border-top: 1px solid $purpledark;
}

.daterangepicker.show-calendar .drp-buttons > *:not(:last-child),
.daterangepicker.show-calendar .drp-calendar > *:not(:last-child) {
  margin-bottom: 16px;
}

.daterangepicker .drp-selected {
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: $purpledark;
  padding-right: 0px;
}

.daterangepicker .drp-buttons .btn {
  margin-left: 0px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 4px;
}

.daterangepicker .btn-secondary {
  background-color: white;
  color: $purpledark;
  border: 1px solid $purpledark;
  &:hover {
    background-color: $purplelight;
  }
}

.daterangepicker .btn-success {
  background-color: $secondary;
  color: $purplelight;
  &:hover {
    background-color: $dark;
  }
}
</style>
