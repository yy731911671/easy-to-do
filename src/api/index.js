import request from './request'
// 举个例子
export function fetchList (query) {
  return request({
    url: 'bsd-import/importTask/list',
    method: 'get',
    params: query
  })
}
