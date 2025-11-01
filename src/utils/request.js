import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus/es'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    // 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    // console.log('发送请求')
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res
    }
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // 错误的特殊情况
    if (err.response?.status === 401) {
      router.push('/login')
    }

    // 错误的默认情况
    ElMessage.error(err.response.date.message || '服务异常')
    Promise.reject(err)
  }
)

export default instance
