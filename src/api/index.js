import request from './request'
import qs from "qs";
// 举个例子
export function signIn(query) {
  return request({
    url: 'api/user/login/',
    method: 'get',
    params: query
  })
}

export function signUp(query) {
  return request({
    url: 'api/user/register/',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(query,{ indices: false })
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

export function updatePassword(query) {
  return request({
    url: 'api/user/updatePassword',
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(query,{ indices: false })
  })
}

export function updateAuthority(query) {
  return request({
    url: 'api/user/updateAuthority',
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(query,{ indices: false })
  })
}

export function addCourse(query) {
  return request({
    url: 'api/course/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(query,{ indices: false })
  })
}

export function updateCourse(query) {
  return request({
    url: 'api/course/update',
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(query,{ indices: false })
  })
}

export function getCourse(query) {
  return request({
    url: 'api/course/list',
    method: 'get',
    params: query
  })
}

export function deleteCourse(query) {
  return request({
    url: 'api/course/delete',
    method: 'delete',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(query,{ indices: false })
  })
}
export function addHomework(query) {
  return request({
    url: 'api/homework/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(query,{ indices: false })
  })
}

export function updateHomework(query) {
  return request({
    url: 'api/homework/update',
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(query,{ indices: false })
  })
}

export function getHomework(query) {
  return request({
    url: 'api/homework/list',
    method: 'get',
    params: query
  })
}

export function deleteHomework(query) {
  return request({
    url: 'api/homework/delete',
    method: 'delete',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(query,{ indices: false })
  })
}
export function addActivity(query) {
  return request({
    url: 'api/activity/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(query,{ indices: false })
  })
}

export function updateActivity(query) {
  return request({
    url: 'api/activity/update',
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(query,{ indices: false })
  })
}

export function getActivity(query) {
  return request({
    url: 'api/activity/list',
    method: 'get',
    params: query
  })
}

export function deleteActivity(query) {
  return request({
    url: 'api/activity/delete',
    method: 'delete',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(query,{ indices: false })
  })
}