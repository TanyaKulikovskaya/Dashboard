const headers = [
  {
    text: 'Call type',
    align: 'left',
    sortable: true,
    filterable: false,
    value: 'type',
  },
  {
    text: 'Status',
    align: 'left',
    sortable: true,
    filterable: false,
    value: 'status',
  },
  {
    text: 'Sourse',
    align: 'center',
    sortable: false,
    value: 'sourse',
  },
  {
    text: 'Destination',
    align: 'center',
    sortable: false,
    value: 'destination',
  },
  {
    text: 'Time',
    align: 'center',
    sortable: false,
    filterable: false,
    value: 'time',
  },
]

const calls = [
  {
    type: 'incoming',
    status: 'unanswered',
    sourse: 159,
    destination: 6.0,
    time: 24,
  },
  {
    type: 'outcoming',
    status: 'unanswered',
    sourse: 800,
    destination: 7.0,
    time: 29,
  },
  {
    type: 'incoming',
    status: 'answered',
    sourse: 400,
    destination: 9.0,
    time: 54,
  },
  {
    type: 'outcoming',
    status: 'answered',
    sourse: 119,
    destination: 2.0,
    time: 29,
  },
  {
    type: 'outcoming',
    status: 'diverted',
    sourse: 600,
    destination: 9.0,
    time: 7,
  },
]

export { headers, calls }
