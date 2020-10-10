import request from '@/utils/request'

// 查询车组列表
export function driverListPost(query) {
  return request({
    url: '/system/scCarFleet/list',
    method: 'get',
    data: query
  })
}

// 新增车组
export function addDriver(data) {
  return request({
    url: '/system/scCarFleet/add',
    method: 'post',
    data: data
  })
}

// 修改车组
export function updateDriver(data) {
  return request({
    url: '/system/scCarFleet/edit',
    method: 'put',
    data: data
  })
}

// 删除车组
export function delDriver(data) {
  return request({
    url: '/system/scCarFleet/remove',
    method: 'post',
    data: data
  })
}

// 修改司机状态
export function editStatus(data) {
  return request({
    url: '/system/scDriver/editStatus',
    method: 'put',
    data: data
  })
}

// 查询所有车组列表
export function getscCarFleetList(data) {
  return request({
    url: '/system/scDriver/trainsetList',
    method: 'get',
    data:data
  })
}
