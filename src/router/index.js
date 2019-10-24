import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import CustomerOrder from '@/components/pages/CustomerOrders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import Coupon from '@/components/pages/Coupons';
import Order from '@/components/pages/Order';


Vue.use(Router)

export default new Router({
  routes: [
    {
      /* 假如網址輸入的不是我們設定的路徑，就重新導向登入頁面 */
      path:'*',
      redirect:'login'
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true }
    // },
    {
      path:'/login',
      name:'Login',
      component:Login 
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children:[
        {
          path:'products',
          name:'Products',
          component:Products,

          /* 
            meta 代表這個頁面是需要經過驗證的
            ，導航守衛發現他需要驗證的話就會執行驗證手續
          */
          meta: { requiresAuth: true },
        },
        {
          path:'coupons',
          name:'Coupons',
          component:Coupon,
          meta: { requiresAuth: true },
        },
        {
          path:'order',
          name:'Order',
          component:Order,
          meta: { requiresAuth: true },
        }
      ]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children:[
        {
          path:'customer_order',
          name:'CustomerOrder ',
          component:CustomerOrder, 
        },
        {
          path:'customer_checkout/:orderId',
          name:'CustomerCheckout', 
          component:CustomerCheckout, 
        }
      ]
    },
  ]
})
