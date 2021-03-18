import {request} from '../require'

export function searchUser(username) {
  return request({
    url:"/admin/searchUser",
    params:{
      "username":username,
    }
  })
}
export function block(id,status) {
  let fm = new FormData();
  fm.append("id",id);
  fm.append("status",status);
  return request({
    url:"/admin/block",
    method:"post",
    data:fm,
  })
}
export function searchPost(id,keyword) {
  return request({
    url:"/admin/searchPosts",
    params:{
      "id":id,
      "keyword":keyword,
    }
  })
}
export function top(id,type) {
  let fm = new FormData()
  fm.append("id",id)
  fm.append("type",type)
  return request({
    url:"/admin/top",
    method:"post",
    data:fm
  })
}

export function del(id,status) {
  let fm = new FormData()
  fm.append("id",id)
  fm.append("status",status)
  return request({
    url:"/admin/del",
    method:"post",
    data:fm
  })
}