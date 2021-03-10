import {request} from './require'
export function register(username,password,email) {
  return request({
    url:"/register",
    method:"post",
    data:{
      "username":username,
      "password":password,
      "email":email
    }
  })
}