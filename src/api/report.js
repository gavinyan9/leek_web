import request from '@/utils/request'

// 查询交易日各板块翻红率
export function getBkZdfInfo(params) {
  return request({
    url: '/apis/report/bk/zdf',
    method: 'get',
    params
  })
}

// 收益信息月报
export function getIncomeMon(params) {
  return request({
    url: '/apis/report/income/mon',
    method: 'get',
    params
  })
}

// 查询持股数据
export function getHolds(params) {
  return request({
    url: '/apis/report/hold',
    method: 'get',
    params
  })
}

// 投资板块比例
export function getBkHolds(params) {
  return request({
    url: '/apis/report/bk/zdf/line',
    method: 'get',
    params
  })
}

// 查询资产信息
export function getAssets(params) {
  return request({
    url: '/apis/report/assets',
    method: 'get',
    params
  })
}
