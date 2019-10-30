// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay'; // 是元件所以可以用全域的方式載入
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import VeeValidate, { Validator } from 'vee-validate'   //匯入檔案
import TW from 'vee-validate/dist/locale/zh_TW'    //匯入語言包

import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import formatFilter from './filters/dateformat';

Vue.use(VueAxios, axios);
Vue.use(VeeValidate);  //啟用API
Validator.localize('zh-TW', TW)  //啟用語言包

// 全域載入
Vue.component('Loading',Loading);
Vue.filter('currency',currencyFilter);
Vue.filter('format',formatFilter);

Vue.config.productionTip = false;

// 讓後端傳過來的 cookie 能夠順利存在瀏覽器中
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

/*
  導航守衛
  此方法會在切換頁面的時候觸發。
  to : 我們即將要到的頁面
  form : 我們從哪個頁面過來
  next : 要到達的下個頁面（放行）
  這個可以讓我們在到特定頁面前做一些驗證（to），當他沒有問題的時候就放行他（next），
  這可以讓我們知道用戶要到哪個路徑，接下來的路徑需不需要登入，需要的話就先驗證，不需要就放行。
  我們可以到 router 裡面 routes 的元件社 meta 來表示需不需要驗證。
*/
router.beforeEach((to, from, next) => {
  console.log('to',to,'\n','from',from,'\n','next',next,'\n');
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`;

    /* 
    // this.$http.post(api).then((response)=>{});
      這裏無法使用 this.$http，因為是在導航守衛這裡執行
      ，並不是在元件內執行，所以無法呼叫 this.$http
      ，this.$http 是在 vue 的元件內才能使用的。
      所以這裡要用 axios  
    */ 
    axios.post(api).then((response) => {
      if(response.data.success){
        next();
      }else{
        next({
          path:'/login',
        });
      }
    });
  }else{
    next();
  }
})