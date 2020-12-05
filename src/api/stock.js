import request from '@/utils/request'

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

// 移除我的收藏
export function delCollect(params) {
  return request({
    url: '/apis/sk_collect/del',
    method: 'get',
    params
  })
}

// 点赞
export function thumbsUp(params) {
  return request({
    url: '/apis/sk_collect/thumbs-up',
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

// 移除Tech数据
export function techDel(params) {
  return request({
    url: '/apis/sk_tech/del',
    method: 'get',
    params
  })
}

// 关注股票实时排名
export function techList(params) {
  return request({
    url: '/apis/sk_tech/list',
    method: 'get',
    params
  })
}

// 调用TX刷新股票实时排名
export function syncRealData(params) {
  return request({
    url: '/apis/sk_tech/sync_xj',
    method: 'get',
    params
  })
}

// 加载评分数据，做实时排名
export function loadReal(params) {
  return request({
    url: '/apis/sk_tech/load',
    method: 'get',
    params
  })
}

// 清空实时估计分析列表数据
export function clearReal(params) {
  return request({
    url: '/apis/sk_tech/clear',
    method: 'get',
    params
  })
}

// 查询处在观察区的股票信息
export function skWatchList(params) {
  return request({
    url: '/apis/sk_watch/list',
    method: 'get',
    params
  })
}

// 将股票从观察区移除
export function delSkWatch(params) {
  return request({
    url: '/apis/sk_watch/del',
    method: 'get',
    params
  })
}

