import {request} from './require'
export function search(query) {
  return request({
    url:"/discuss/search",
    params:{
      "query":query
    }
  })
}