import request from '@/utils/request'

// 文章分类列表
export const articleGetChannelService = () => {
  return request.get('/my/cate/list')
}