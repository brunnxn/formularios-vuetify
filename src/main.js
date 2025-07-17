/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify' // se você tiver configurado o Vuetify

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')


