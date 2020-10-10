import request from '@/utils/request'

// 查询订单列表
export function driverListPost(query) {
  return request({
    url: '/system/scOrder/list',
    method: 'POST',
    data: query
  })
}

// 新增订单
export function addDriver(data) {
  return request({
    url: '/system/scOrder/add',
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

// 查询所有车组列表
export function orderBindCarList(data) {
  return request({
    url: '/system/scCar/orderBindCarList',
    method: 'get',
    data:data
  })
}
// 订单列表数量展示接口
export function orderNumberList(data) {
  return request({
    url: '/system/scOrder/orderNumberList',
    method: 'GET',
    data:data
  })
}

// 一键派单
export function onekey(data) {
  return request({
    url: '/system/scOrder/onekey',
    method: 'POST',
    data:data
  })
}
