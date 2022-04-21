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
        dark: '#161B40',
        light: '#FFF9E9',
        orange: '#EFA500',
      },
    },
  },
})
