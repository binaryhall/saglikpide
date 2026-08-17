import { createRouter, createWebHistory } from 'vue-router'
import approutes from '@/core/router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...approutes],
})

export default router
