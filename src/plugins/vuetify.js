import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        dark: '#1d1d2c',
        light: '#f7f4e9',
        warning: '#eba63f',
        info: '3bb273',
        primary: '#3cbcc3',
        secondary: '#a5a6e5',
        error: '#e40c2b',
        input: '#efedff',
        label: '#6F72ad',
      },
    },
  },
})
