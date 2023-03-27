import HomeIndex from '../pages/home/Index.vue';
import HomeWeb from '../pages/home/Web.vue';

const routes = [
  {
    path: "/",
    name: "home-web",
    component: HomeWeb,
  },
  {
    path: "/home",
    name: "home-index",
    component: HomeIndex,
    meta: { requiresAuth: true }
  },
];

export default routes;