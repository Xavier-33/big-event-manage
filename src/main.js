import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores'

import '@/assets/main.scss'

const app = createApp(App)

// console.log(gaga)

app.use(pinia)
app.use(router)

app.mount('#app')
