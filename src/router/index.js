import Vue from 'vue';
import VueRouter from 'vue-router';

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

const Home = () => import('views/home/Home')
const Message = () => import('views/message/Message')
const Register = ()=> import('views/login/Register')
const Login = ()=> import('views/login/Login')
const Account = ()=> import('components/Account')
const MessageDetail = ()=> import('components/MessageDetail')
const Search = ()=> import('components/Search')
const Profile = () => import('views/profile/Profile')
const AdminHome = () => import("views/admin/AdminHome")
const PostDetail = ()=> import('views/postDetail/postDetail')

const routes = [
  {
    path:'',
    redirect:'/home',
  },
  {
    path:'/message',
    component:Message,
    meta: {login_required: true}
  },
  {
    path:'/messageDetail/:conversationId',
    component:MessageDetail,
    meta: {login_required: true}
  },
  {
    path:'/home',
    component:Home,
  },
  {
    path:'/profile/:userId',
    component:Profile,
  },
  {
    path:'/register',
    component:Register,
  },
  {
    path:'/login',
    component:Login,
  },
  {
    path:'/account',
    component:Account,
    meta: {login_required: true}
  },
  {
    path:'/postDetail/:postId',
    component:PostDetail,
  },
  {
    path:'/search',
    component:Search,
  },
  {
    path:"/admin/home",
    component:AdminHome,
    meta: {login_required: true},
    beforeEnter: (to, from, next) => {
      let isSignin = localStorage.getItem("userType")=="1";
      if(!isSignin){
        next('/login');
      }else{
        next();
      }
    }
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
