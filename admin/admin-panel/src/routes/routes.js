import { createRouter, createWebHistory } from 'vue-router'
import UsersPages from '../pages/UsersPages.vue'
import OrdersPages from '../pages/OrdersPages.vue'
import DashBoardPages from '../pages/DashBoardPages.vue'
import AddCartPages from '../pages/AddCartPages.vue'
const routes = [
  {
    path: '/users',
    name: 'UsersPages',
    component: UsersPages
  },
  {
    path: '/orders',
    name: 'OrdersPages',
    component: OrdersPages
  },

  {
    path: '/',
    name: 'DashBoardPages',
    component: DashBoardPages
  },
  {
    path: '/addcart',
    name: 'AddCartPages',
    component: AddCartPages
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
