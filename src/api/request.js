import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: '', // api 的 base_url
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 6000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
