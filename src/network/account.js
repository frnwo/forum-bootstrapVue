import {request} from "./require";
export function updatePwd(oldPassword,newPassword) {
  // console.log(oldPassword,newPassword);
  let fm = new FormData();
  fm.append("oldPassword",oldPassword);
  fm.append("newPassword",newPassword);
  return request({
    url:'/user/updatePassword',
    method:'post',
    data:fm,
  });
}
//更新头像
export function updatePhoto(file) {
  let fm = new FormData();
  fm.append("image",file);
  return request({
    method:"post",
    url:"/user/upload",
    data:fm,
    headers:{"Content-Type":"multipart/form-data"}
  })
}