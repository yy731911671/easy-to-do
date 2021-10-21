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

// export function fetchNewsIdList () {
//   return request({
//     url: 'https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty',
//     method: 'get'
//   })
// }
//
// export function fetchNewsList (query) {
//   return request({
//     url: `https://hacker-news.firebaseio.com/v0/item/${query}.json?print=pretty`,
//     method: 'get'
//   })
// }
