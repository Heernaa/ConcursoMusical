import { createRouter, createWebHistory } from 'vue-router'
import ComponentesView from '@/views/ComponentesView.vue'
import LandingView from '@/views/LandingView.vue'
import JugarView from '@/views/JugarView.vue'
import LeaderboardPreviewView from '@/views/LeaderboardPreviewView.vue'
import LeaderboardView from '@/views/LeaderboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/componentes', name: 'componentes', component: ComponentesView },
    { path: '/leaderboard', name: 'ranking', component: LeaderboardView },
    {
      path: '/leaderboard-preview',
      name: 'leaderboard-preview',
      component: LeaderboardPreviewView,
    },
    { path: '/jugar', name: 'jugar', component: JugarView },
    { path: '/', name: 'home', component: LandingView },
  ],
})

export default router
