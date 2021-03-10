import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //登录的用户信息
    isLogin:false,
  },
  mutations: {
    //this.$store.commit('login',数据)
    login(state,payload){
      state.isLogin = payload;
    },
  
  },
  actions: {
  },
  modules: {
  }
})
