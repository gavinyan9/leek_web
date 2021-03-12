import request from '@/utils/request'
// 龙头法->板块->同步数据
export function syncCy4BkCode(params) {
  return request({
    url: '/apis/cycle/cy/sync/bk',
    method: 'get',
    params
  })
}
// 龙头法->顶部数据->同步数据
export function syncCyQ5Gj(params) {
  return request({
    url: '/apis/cycle/cy/syncCyQ5',
    method: 'get',
    params
  })
}
// 更新Wp现价
export function upWpXj(params) {
  return request({
    url: '/apis/cycle/wp/upWpXj',
    method: 'get',
    params
  })
}

// 修改CyStatus
export function upCyStatus(params) {
  return request({
    url: '/apis/cycle/cy/upCyStat',
    method: 'get',
    params
  })
}

// cycle分析分页查询
export function getCyclePage(params) {
  return request({
    url: '/apis/cycle/pages',
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
    url: '/apis/cycle/bs/bkList',
    method: 'get',
    params
  })
}

// 查询股票超市列表
export function getMarketList(params) {
  return request({
    url: '/apis/cycle/sk/hot',
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

