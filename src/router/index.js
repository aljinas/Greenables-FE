import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Pages/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Login', component: Login, meta:{ public:false } },
  // Admin Components
  { path: '/branch', name: 'Branch', component: () => import('../views/admin_pages/Branch.vue'), meta:{ public:true } },
  { path: '/financial_year', name: 'FinancialYear', component: () => import('../views/admin_pages/FinancialYear.vue'), meta:{ public:true } },
  { path: '/employee', name: 'Employee', component: () => import('../views/admin_pages/Employee.vue'), meta:{ public:true } },

  // Sales Componenets
  { path: '/sale_entry', name: 'Sales Entry', component: () => import('../views/sales/SaleEntry.vue'), meta:{ public:true } },

  // Product Components
  { path: '/product', name: 'Product', component: () => import('../views/products/Product.vue'), meta:{ public:true } },
  { path: '/pricing', name: 'Pricing', component: () => import('../views/products/Pricing.vue'), meta:{ public:true } },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
