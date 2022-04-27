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
        light: '#f7f4e9 ',
        orange: '#eba63f',
        green: '#438945',
        blue: '#3cbcc3',
        red: '#e40c2b',
      },
    },
  },
})
