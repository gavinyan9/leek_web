import request from '@/utils/request'

// 查询板块下拉框
export function getSelectBk(params) {
  return request({
    url: '/apis/comm/select/bk',
    method: 'get',
    params
  })
}

// 查询概念下拉框
export function getSelectGn(params) {
  return request({
    url: '/apis/comm/select/gn',
    method: 'get',
    params
  })
}
