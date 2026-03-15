import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SkillsPage from '../views/SkillsPage.vue'
import SkillDetail from '../views/SkillDetail.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/skills',
    name: 'SkillsPage',
    component: SkillsPage
  },
  {
    path: '/skills/:slug',
    name: 'SkillDetail',
    component: SkillDetail,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0 }
    }
  }
})

export default router
