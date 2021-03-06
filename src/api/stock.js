import request from '@/utils/request'

// cycle分析分页查询
export function getCyclePage(params) {
  return request({
    url: '/apis/stock/cycle/page',
    method: 'get',
    params
  })
}

// 查询尾盘数据列表
export function getWpPage(params) {
  return request({
    url: '/apis/cycle/wp/page',
    method: 'get',
    params
  })
}

// 将个股从尾盘观察区移除
export function delCycleWp(params) {
  return request({
    url: '/apis/cycle/wp/del',
    method: 'get',
    params
  })
}

// 添加个股至尾盘观察区
export function addCycleWp(params) {
  return request({
    url: '/apis/cycle/wp/add',
    method: 'get',
    params
  })
}

// 查询板块下拉框
export function getBkList(params) {
  return request({
    url: '/apis/stock/select/bk',
    method: 'get',
    params
  })
}

// 查询我的收藏
export function getCollectList(params) {
  return request({
    url: '/apis/sk_collect/list',
    method: 'get',
    params
  })
}

// 添加我的收藏
export function addCollect(data) {
  return request({
    url: '/apis/sk_collect/add',
    method: 'post',
    data
  })
}

// 添加我的收藏
export function updateGj(data) {
  return request({
    url: '/apis/sk_collect/updateGj',
    method: 'get',
    data
  })
}

// 移除我的收藏
export function delCollect(params) {
  return request({
    url: '/apis/sk_collect/del',
    method: 'get',
    params
  })
}

// 查询股票超市列表
export function getMarketList(params) {
  return request({
    url: '/apis/stock/market/list',
    method: 'get',
    params
  })
}

// 查询炒股心得
export function getNotes(params) {
  return request({
    url: '/apis/sk_notes/pages',
    method: 'get',
    params
  })
}

// 保存炒股心得
export function saveNotes(data) {
  return request({
    url: '/apis/sk_notes/add',
    method: 'post',
    data
  })
}

