import request from '@/utils/request'

// 查询上市公司列表
export function companyPages(params) {
  return request({
    url: '/apis/comp/list',
    method: 'get',
    params
  })
}

// 删除上市公司
export function delCompany(params) {
  return request({
    url: '/apis/comp/del',
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
