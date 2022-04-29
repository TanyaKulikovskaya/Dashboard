const headers = [
  {
    text: 'Call type',
    align: 'left',
    sortable: false,
    filterable: false,
    value: 'type',
  },
  {
    text: 'Status',
    align: 'left',
    sortable: false,
    filterable: false,
    value: 'status',
  },
  {
    text: 'Sourse',
    align: 'left',
    sortable: false,
    value: 'sourse',
  },
  {
    text: 'Destination',
    align: 'left',
    sortable: false,
    value: 'destination',
  },
  {
    text: 'Duration',
    align: 'center',
    sortable: false,
    filterable: false,
    value: 'duration',
  },
]

const calls = [
  {
    type: 'incoming',
    status: 'unanswered',
    sourse: 159,
    destination: 144800100,
    duration: '0:00:10',
  },
  {
    type: 'outcoming',
    status: 'unanswered',
    sourse: 800810100,
    destination: 120,
    duration: '0:00:00',
  },
  {
    type: 'incoming',
    status: 'answered',
    sourse: 400,
    destination: 122000111,
    duration: '0:08:40',
  },
  {
    type: 'outcoming',
    status: 'answered',
    sourse: 119,
    destination: 80080010090,
    duration: '1:04:30',
  },
  {
    type: 'outcoming',
    status: 'diverted',
    sourse: 600233,
    destination: 10030040011,
    duration: '0:04:00',
  },
  {
    type: 'incoming',
    status: 'unanswered',
    sourse: 390100100,
    destination: 50043044011,
    duration: '0:10:00',
  },
  {
    type: 'outcoming',
    status: 'diverted',
    sourse: 600,
    destination: 120,
    duration: '0:14:14',
  },
]

export { headers, calls }
