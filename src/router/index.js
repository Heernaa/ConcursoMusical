import { createRouter, createWebHistory } from 'vue-router'
import { useJugadorStore } from '@/stores/jugador'
import ComponentesView from '@/views/ComponentesView.vue'
import LandingView from '@/views/LandingView.vue'
import JugarView from '@/views/JugarView.vue'
import JuegoView from '@/views/JuegoView.vue'
import LeaderboardPreviewView from '@/views/LeaderboardPreviewView.vue'
import LeaderboardView from '@/views/LeaderboardView.vue'
import ResultadoView from '@/views/ResultadoView.vue'

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
    {
      path: '/partida',
      name: 'partida',
      component: JuegoView,
      // Solo se puede jugar con un jugador registrado; si no, se vuelve a Jugar.
      // El store se obtiene aquí dentro (y no al inicio del archivo) porque Pinia
      // aún no está activo cuando se importa el router en main.js.
      beforeEnter: () => {
        const jugador = useJugadorStore()
        if (jugador.nombre === '') {
          return { name: 'jugar' }
        }
      },
    },
    {
      path: '/resultados',
      name: 'resultados',
      component: ResultadoView,
      /*      beforeEnter: () => {
        const jugador = useJugadorStore()
        if (jugador.nombre === '')
        {
        return { name: 'jugar' }
        }
      }
*/
    },
    { path: '/', name: 'home', component: LandingView },
  ],
})

export default router
