import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //登录的用户信息
    isLogin:false,
    username:undefined,
    userId:undefined,
  },
  mutations: {
    //this.$store.commit('login',数据)
    login(state,payload){
      state.isLogin = payload;
    },
    username(state,payload){
      state.username = payload;
    },
    userId(state,payload){
      state.userId = payload
    }
  
  },
  actions: {
  },
  modules: {
  }
})
