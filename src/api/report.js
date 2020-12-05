import request from '@/utils/request'

// 收益信息日报
export function getIncomeDay(params) {
  return request({
    url: '/apis/report/income/day',
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
    url: '/apis/report/bk/hold',
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
