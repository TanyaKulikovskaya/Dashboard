import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import formattedTitle from './filters/title-format'

Vue.config.productionTip = false

Vue.filter('formattedTitle', formattedTitle)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
