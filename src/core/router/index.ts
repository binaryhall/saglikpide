import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuLayout from '@/layouts/MenuLayout.vue'
import MenuView from '../views/MenuView.vue'
import InterierView from '../views/InterierView.vue'
const approutes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
      {
        path: '/interier',
        name: 'interier',
        component: InterierView,
      },
    ],
  },
  {
    path: '/',
    component: MenuLayout,
    children: [
      {
        path: '/restourant/menu',
        name: 'restourantMenu',
        component: MenuView,
      },
    ],
  },
]

export default approutes
