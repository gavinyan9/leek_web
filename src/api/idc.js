import request from '@/utils/request'

// 查询上市公司列表
export function companyPages(params) {
  return request({
    url: '/apis/comp/list',
    method: 'get',
    params
  })
}

// 将新的上市公司纳入考察范围
export function addCmpToSkInfo(params) {
  return request({
    url: '/apis/comp/add/market',
    method: 'get',
    params
  })
}

// Profit更新板块信息
export function editType(params) {
  return request({
    url: '/apis/sk_profit/update',
    method: 'get',
    params
  })
}

// Profit点赞
export function thumbsUpProfit(params) {
  return request({
    url: '/apis/sk_profit/updateScore',
    method: 'get',
    params
  })
}

// 查询股票年化收益列表
export function getProfitList(params) {
  return request({
    url: '/apis/sk_profit/list',
    method: 'get',
    params
  })
}

// 将股票添加到观察区
export function addSkWatch(params) {
  return request({
    url: '/apis/sk_watch/add',
    method: 'get',
    params
  })
}