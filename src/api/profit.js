import request from '@/utils/request'

// 个股月收益率列表
export function getPfMonPages(params) {
  return request({
    url: '/apis/pf_mon/pages',
    method: 'get',
    params
  })
}
