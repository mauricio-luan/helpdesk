import { createApp } from 'vue'

import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify'

import App from './App.vue'
import TheHeader from './components/TheHeader.vue'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)

app.component('the-header', TheHeader)

app.mount('#app')
