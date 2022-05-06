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
        dark: '#5f639d',
        light: '#f7f4e9',
        primary: '#3cbcc3',
        secondary: '#a5a6e5',
        error: '#e40c2b',
        warning: '#eba63f',
        info: '3bb273',
        purplelight: '#efedff',
        purpledark: '#6F72ad',
      },
    },
  },
})
