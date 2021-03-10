import {request} from "./require";
export function login(username,password,kaptcha,checked) {
  // console.log(username,password,kaptcha)
  
  let fm = new FormData();
  fm.append("username",username);
  fm.append("password",password);
  fm.append("code",kaptcha);
  fm.append("rememberme",checked=="1")
  return request({
    url:'/login',
    method:'post',
    data:fm,
  });
}