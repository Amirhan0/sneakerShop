import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/HomeComponent.vue'
import Favorites from '../pages/FavoriteComponent.vue'
import Profile from '../pages/ProfileComponent.vue'
import Login from '../pages/LoginComponent.vue'
import User from '../pages/UserProfileComponent.vue'

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

export default router