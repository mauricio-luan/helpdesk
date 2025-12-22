import { createApp } from 'vue'

import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify'

import App from './App.vue'
import SnackBar from './components/common/SnackBar.vue'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)

app.component('SnackBar', SnackBar)

app.mount('#app')
