import request from '@/utils/request'

// 收费标准列表
export function listCost (query) {
  return request({
    url: '/system/scChargeMark/list',
    method: 'get',
    data: query
  })
}

// 新增标准列表
export function addCost (query) {
  return request({
    url: '/system/scChargeMark/add',
    method: 'post',
    data: query
  })
}

// 修改标准列表
export function editCost (query) {
  return request({
    url: '/system/scChargeMark/edit',
    method: 'put',
    data: query
  })
}

// 删除列表
export function delCost (query) {
  return request({
    url: '/system/scChargeMark/remove',
    method: 'post',
    data: query
  })
}
