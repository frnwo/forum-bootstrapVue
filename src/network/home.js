import {request} from  './require';
export function getDiscussPosts(current,limit,postArea) {
  return request({
    url:'/index',
    params:{
      current,
      limit,
      postArea
    }
  })
}
//退出
export function logout() {
  return request({
    url:'/logout',
  })
}
//发布
export function publish(title,content,postArea,files) {
  console.log(files)
  let fm = new FormData();
  fm.append("title",title);
  fm.append("content",content);
  fm.append("postArea",postArea);
  for (const f of files) {
    fm.append("files",f);
  }
  return request({
    url:"/discuss/add",
    method:"post",
    data:fm,
    headers:{"Content-Type":"multipart/form-data"}
  })
}

// export function getHomeMultidata(){
//   return request({
//     url:'/home/multidata'
//   })
// }
// export function getHomeGoods(type,page){
//   return request({
//     url:'/home/data',
//     params:{
//       type,
//       page,
//     },
//   })
// }