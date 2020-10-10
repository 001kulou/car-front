import request from '@/utils/request'

// 查询司机列表
export function driverListPost(query) {
  return request({
    url: '/system/scDriver/list',
    method: 'get',
    data: query
  })
}

// 新增司机
export function addDriver(data) {
  return request({
    url: '/system/scDriver/add',
    method: 'post',
    data: data
  })
}

// 修改司机
export function updateDriver(data) {
  return request({
    url: '/system/scDriver/edit',
    method: 'put',
    data: data
  })
}

// 删除司机
export function delDriver(data) {
  return request({
    url: '/system/scDriver/remove',
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
    url: '/system/scCarFleet/getscCarFleetList',
    method: 'get',
    data:data
  })
}
// 根据车组id查询对应的详情列表
export function trainsetList(data) {
  return request({
    url: '/system/scDriver/trainsetList',
    method: 'get',
    data:data
  })
}

// 重置密码
export function resetPassword(data) {
  return request({
    url: '/system/scDriver/resetPassword',
    method: 'POST',
    data:data
  })
}
// 修改账号状态
export function updateAccountStatus(data) {
  return request({
    url: '/system/scDriver/updateAccountStatus',
    method: 'put',
    data: data
  })
}
// 设置队长
export function editCaptain(data) {
  return request({
    url: '/system/scDriver/editCaptain',
    method: 'PUT',
    data: data
  })
}
