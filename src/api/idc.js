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

// 添加上市公司
export function addCompany(params) {
  return request({
    url: '/apis/comp/add',
    method: 'get',
    params
  })
}

// 查询股票年化收益列表
export function profitYearPages(params) {
  return request({
    url: '/apis/pf_year/pages',
    method: 'get',
    params
  })
}

// 百强股分页查询
export function getPfTotalPages(params) {
  return request({
    url: '/apis/bm/pages',
    method: 'get',
    params
  })
}

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
