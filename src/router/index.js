import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import PortfolioView from '@/views/PortfolioView.vue';
import PhotoDetail from '@/views/PhotoDetail.vue';
import About from '@/views/About.vue';
import ContattiView from '@/views/ContattiView.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/portfolio', name: 'PortfolioView', component: PortfolioView },
  { path: '/photo/:id', name: 'PhotoDetail', component: PhotoDetail, props: true },
  { path: '/about', name: 'About', component: About },
  { path: '/contatti', name: 'ContattiView', component: ContattiView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
