import {request} from "./require";
export function getMessage(current,limit) {
  return request({
    url:"/letter/list",
    method:"get",
    params:{
      current:current,
      limit:limit,
    }
  })
}

export function getMessageDetail(current,conversationId) {
  console.log("current",current)
  return request({
    url:"/letter/detail/"+conversationId,
    params:{
      current:current
    }
  })
}