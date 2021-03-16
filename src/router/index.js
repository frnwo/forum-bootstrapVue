import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import('views/home/Home')
const Message = () => import('views/message/Message')
const Register = ()=> import('views/login/Register')
const Login = ()=> import('views/login/Login')
const Account = ()=> import('components/Account')
const MessageDetail = ()=> import('components/MessageDetail')

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

  // {
  //   path:'/profile',
  //   component:Profile,
  // },
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
  }
  // {
  //   // path:'/detail/:iid',
  //   path:'/detail',
  //   component:Detail,
  // }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
