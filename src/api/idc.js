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

