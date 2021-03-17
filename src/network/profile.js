import {request} from "./require";

export function getProfile(userId) {
  return request({
    url:"/user/profile/detail/"+userId,
  })
}
export function getFollowees(userId) {
  return request({
    url:"/followees/"+userId
  })
}
export function getFollowers(userId) {
  return request({
    url:"/followers/"+userId
  })
}
export function follow(userId) {
  let fm = new FormData()
  fm.append("entityType",3);
  fm.append("entityId",userId);
  return request({
    url:"/follow",
    method:"post",
    data:fm,
  })
}
export function unfollow(userId) {
  let fm = new FormData()
  fm.append("entityType",3);
  fm.append("entityId",userId);
  return request({
    url:"/unfollow",
    method:"post",
    data:fm,
  })
}
export function getPosts(userId) {
  return request({
    url:"/discuss/posts/"+userId,
  })
}
export function del(id) {
  let fm = new FormData();
  fm.append("postId",id);
  return request({
    url:"/discuss/delete",
    method:"post",
    data:fm
  })
}