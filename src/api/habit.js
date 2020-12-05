import request from '@/utils/request'

export function getDiaryList(params) {
  return request({
    url: '/apis/diary/list',
    method: 'get',
    params
  })
}

export function createDiary(data) {
  return request({
    url: '/apis/diary/save',
    method: 'post',
    data
  })
}

export function getPlanList(params) {
  return request({
    url: '/apis/plans/list',
    method: 'get',
    params
  })
}

export function getIdeaList(params) {
  return request({
    url: '/apis/ideas/list',
    method: 'get',
    params
  })
}

export function createIdea(data) {
  return request({
    url: '/apis/ideas/save',
    method: 'post',
    data
  })
}
