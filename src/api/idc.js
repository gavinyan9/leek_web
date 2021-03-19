import request from '@/utils/request'

// 查询上市公司列表
export function companyPages(params) {
  return request({
    url: '/apis/idc/company/pages',
    method: 'get',
    params
  })
}

// 查询股票年化收益列表
export function profitYearPages(params) {
  return request({
    url: '/apis/idc/pf_year/pages',
    method: 'get',
    params
  })
}

// 个股月收益率列表
export function getPfMonPages(params) {
  return request({
    url: '/apis/idc/pf_mon/pages',
    method: 'get',
    params
  })
}
// 实时同步股票价格
export function syncDayGj(params) {
  return request({
    url: '/apis/idc/pf_day/sync',
    method: 'get',
    params
  })
}
