import './assets/scss/main.scss'
import './assets/scss/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import pinia from './store/index'
import { elementIconPlugins } from './plugins/elementIconPlugins'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(elementIconPlugins)
app.mount('#app')
