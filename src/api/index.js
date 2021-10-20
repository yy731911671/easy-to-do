import request from './request'
// 举个例子
export function signIn (query) {
  return request({
    url: 'user',
    method: 'get',
    params: query
  })
}

export function signUp(query) {
  return request({
    url: '/user',
    method: 'post',
    data: query
  })
}