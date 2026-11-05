import { createRouter, createWebHistory } from 'vue-router'
import ComponentesView from '@/views/ComponentesView.vue'
import OtroView from '@/views/OtroView.vue'
import LandingView from '@/views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/componentes', name: 'componentes', component: ComponentesView },
    { path: '/otro', name: 'otro', component: OtroView },
    { path: '/', name: 'home', component: LandingView}
  ],
})

export default router
