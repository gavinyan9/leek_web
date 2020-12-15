import request from '@/utils/request'

// 个股月收益率列表
export function getPfMonPages(params) {
  return request({
    url: '/apis/pf_mon/pages',
    method: 'get',
    params
  })
}

// 个股日收益率列表
export function getPfDayPages(params) {
  return request({
    url: '/apis/pf_day/pages',
    method: 'get',
    params
  })
}

// 实时同步股票价格
export function syncDayGj(params) {
  return request({
    url: '/apis/pf_day/sync',
    method: 'get',
    params
  })
}
