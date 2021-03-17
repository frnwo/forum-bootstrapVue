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
  return request({
    url:"/letter/detail/"+conversationId,
    params:{
      current:current
    }
  })
}
export function sendMessage(toName,content) {
  let fm = new FormData();
  fm.append("toName",toName);
  fm.append("content",content);
  return request({
    url:"/letter/send",
    method:"post",
    data:fm,
  })
}