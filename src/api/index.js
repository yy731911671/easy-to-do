import request from './request'
import qs from "qs";
// 举个例子
export function signIn(query) {
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

export function newsList() {
  return request({
    url: 'api/news/list/',
    method: 'get'
  })
}


export function newsDetail(query) {
  return request({
    url: `api/news/list/${query}`,
    method: 'get'
  })
}

export function editNews(query) {
  return request({
    url: 'api/news/edit/',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(query,{ indices: false })
  })
}

export function commentList(query) {
  return request({
    url: `api/comment/list/${query}`,
    method: 'get'
  })
}

export function editComment(query) {
  return request({
    url: 'api/comment/edit/',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(query,{ indices: false })
  })
}

