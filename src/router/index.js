import { createRouter, createWebHistory } from 'vue-router'
import Signup from '../pages/SignUp.vue'
import NameRegistry from '../pages/NameRegistry.vue'
import BusinessInfo from '../pages/BusinessInfo.vue'
import BrandingPage from '../pages/BrandingPage.vue'
import PrincipalLayout from '../components/PrincipalLayout.vue'
const routes = [
  {
    path: '/',
    component: PrincipalLayout,
    children: [
      { path: '/signup', name: 'Signup', component: Signup },
      { path: '/name-registry', name: 'NameRegistry', component: NameRegistry },
      { path: '/business-info', name: 'BusinessInfo', component: BusinessInfo },
      { path: '/', name: 'Branding', component: BrandingPage }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
