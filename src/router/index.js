// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import CadastroBanco from '../components/CadastroBanco.vue'
import CadastroConta from '../components/CadastroConta.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/cadastro-banco',
    name: 'CadastroBanco',
    component: CadastroBanco,
    meta: { requiresAuth: true }
  },
  {
    path: '/cadastro-conta',
    name: 'CadastroConta',
    component: CadastroConta,
    meta: { requiresAuth: true }
  }
]
const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de rota
router.beforeEach((to, from, next) => {
  const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router
