import axios from 'axios'
import store from '@/store'

// 携带cookie
axios.defaults.withCredentials=true;
const instance = axios.create({
  baseURL: 'http://localhost:8888/forum',
  timeout: 50000,
})
export function request(config) {
  // 浏览器请求时的拦截器：第一个参数是请求成功时回调，第二个参数是请求失败时回调
  instance.interceptors.request.use(config => {
    // console.log(config);
    //1.比如config中的一些信息不符合服务器的要求

    //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标

    //3.比如某些网络请求(比如登录(token))，必须携带一些特殊的信息
    return config; //拦截后要返回config,否则无法执行后面的代码
  },err =>{})

  //服务器响应时的拦截器： 
  instance.interceptors.response.use(res =>{
    //token过期
    if(res.data.tokenErr=="1"){
      localStorage.removeItem("isLogin");
      localStorage.removeItem("username");
      store.commit("login", false);
      window.location.href="http://localhost:8080/login"
    }
    return res; //记住拦截后要返回，否则后面代码无法执行
  },err => {
    console.log(err);
  })

  return instance(config) //返回一个Promise
}

