import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

//权限验证
router.beforeEach((to, from, next) => {
  //校验是否登陆了
  let isSignin = localStorage.getItem("isLogin")=="1";
  let matched = to.matched.some((item) => {
    return item.meta.login_required;
  });
  if(!isSignin && matched){
    next('/login');
  }else{
    next();
  }
});
// 添加事件总线对象
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
