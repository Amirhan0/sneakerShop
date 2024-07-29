import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/HomeComponent.vue'
import Favorites from './pages/FavoriteComponent.vue'
import Profile from './pages/ProfileComponent.vue'
import Login from './pages/LoginComponent.vue'
import User from './pages/UserProfileComponent.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/favorites', name: 'favorites', component: Favorites },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/login', name: 'login', component: Login },
  { path: '/profile/:username', name: 'userprofile', component: User }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(autoAnimatePlugin)
app.use(router)
app.mount('#app')
