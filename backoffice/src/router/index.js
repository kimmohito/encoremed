import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import LoginPage from '../components/LoginPage.vue';
import DashboardPage from '../components/DashboardPage.vue';

const routes = [
  // Other routes
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
