import {request} from './require'

export function getPostDetail(postId,page) {
  return request({
    url:"/discuss/detail/"+postId,
    params:{
      current:page,
    }
  })
}
export function comment(entityType,entityId,content,targetId) {
  let fm = new FormData()
  fm.append("entityType",entityType);
  fm.append("entityId",entityId);
  fm.append("content",content);
  fm.append("targetId",targetId);
  return request({
    url:"/comment/add",
    method:"post",
    data:fm,
  })
}
export function like(entityType, entityId, entityUserId) {
  let fm = new FormData()
  fm.append("entityType",entityType)
  fm.append("entityId",entityId)
  fm.append("entityUserId",entityUserId)
  return request({
    url:"/like",
    method:"post",
    data:fm,
  })
}


// export function getDeatail(iid){
//   return request({
//     url:'/detail',
//     params:{
//       iid
//     }
//   })
// }
// export function getRecommend(){
//   return request({
//     url:'/recommend'
//   })
// }
// export class Goods{
//   constructor(itemInfo,columns,services){
//     this.title = itemInfo.title
//     this.desc = itemInfo.desc
//     // this.newPrice = itemInfo.newPrice
//     this.oldPrice = itemInfo.oldPrice
//     this.discountDesc = itemInfo.discountDesc
//     this.columns = columns
//     this.services = services
//     this.realPrice = itemInfo.lowNowPrice
//   }
// }
// export class GoodsParam {
//   constructor(info, rule) {
//     // 注: images可能没有值(某些商品有值, 某些没有值)
//     this.image = info.images ? info.images[0] : '';
//     this.infos = info.set;
//     this.sizes = rule.tables;
//   }
// }