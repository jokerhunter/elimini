import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import { Register, Maintanence, ComingSoon } from '../views/'
import { MainContent, Help, Settings, History, Channals, Catagroies, Collection, UploadVideos, UploadFile, Videos, VideosList, HistroyVideos } from '../components/'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/', redirect: '/maincontent' },
      { path: '/maincontent', component: MainContent },
      { path: '/help', component: Help },
      { path: '/settings', component: Settings },
      { path: '/history', component: History },
      { path: '/channals', component: Channals },
      { path: '/catagroies', component: Catagroies },
      { path: '/collection', component: Collection },
      { path: '/uploadvideos', component: UploadVideos },
      { path: '/uploadfile', component: UploadFile },
      { path: '/videos', component: Videos },
      { path: '/videolist', component: VideosList },
      { path: '/historyvideos', component: HistroyVideos }
    ]
  },
  { path: '/maintanence', component: Maintanence },
  { path: '/comingsoon', component: ComingSoon }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') return next()
  if (!Vue.prototype.$tokenStorage.getData('token')) return next('/login')
  next()
})

export default router
