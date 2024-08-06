import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import routes from './routes/routes'

const app = createApp(App)
app.use(routes)
app.mount('#app')
