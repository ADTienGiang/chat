  import {
      createRouter,
      createWebHistory
    } from 'vue-router'
    import Home from '../pages/home.vue'

    import env from './env.js';
    
    const router = createRouter({
      history: createWebHistory(),
      routes: [{
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('../pages/login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../pages/register.vue')
        },
        {
          path: '/chat',
          name: 'chat',
          component: () => import('../pages/chat.vue')
        },
        {
          path: '/auth/google',
          name: 'google-auth',
          beforeEnter() {
            // redirect đến trang xác thực Google
            window.location.href = `${env.apiBaseUrl}auth/google`;
          }
        },
        {
          path: '/auth/facebook',
          name: 'facebook-auth',
          beforeEnter() {
            // redirect đến trang xác thực Google
            window.location.href = `${env.apiBaseUrl}auth/facebook`;
          }
        },
      ]
    })
    
    export default router;