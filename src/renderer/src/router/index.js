import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../views/childs/Dashboard.vue')
        },
        {
          path: 'moving-file',
          name: 'Moving File',
          component: () => import('../views/childs/MovingFile.vue')
        },
        {
          path: 'generate-file',
          name: 'Generate File',
          component: () => import('../views/childs/FileGenerate.vue')
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('../views/childs/Settings.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    }
  ]
})

export default router