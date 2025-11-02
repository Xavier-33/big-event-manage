import request from '@/utils/request'

// 分类：获取文章分类
export const articleGetChannelService = () => {
  return request.get('/my/cate/list')
}
// 分类：添加文章分类
export const articleAddChannelService = (data) => {
  return request.post('/my/cate/add', data)
}
// 分类：编辑文章分类
export const articleEditChannelService = (data) => {
  return request.put('/my/cate/info', data)
}