import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/wheather/:state/:city',
      name: 'detailCity',
      component: () => import('../views/CityView.vue'),
      meta: {
        title: 'Weather'
      }
    }
  ]
});

router.beforeEach((to, _, next) => {
  document.title = `${
    (to.params?.state && to.params?.city) 
      ? `${to.params.state}, ${to.params.state}` 
      : to.meta.title} | The Local Weather`;

  next();
});

export default router;
