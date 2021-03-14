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