import request from '@/utils/request'

// 车俩列表
export function listCar (query) {
  return request({
    url: '/system/scCar/list',
    method: 'get',
    data: query
  })
}

// 新增车辆标准
export function addCar (query) {
  return request({
    url: '/system/scCar/add',
    method: 'post',
    data: query
  })
}

// 修改车俩标准
export function editCar (query) {
  return request({
    url: '/system/scCar/edit',
    method: 'put',
    data: query
  })
}

// 删除车辆列表
export function delCar (query) {
  return request({
    url: '/system/scCar/deleteCar',
    method: 'post',
     data: query
    })
}

// 司机列表
export function listDriver (query) {
  return request({
    url: '/system/scDriver/carBindDriverList',
    method: 'get',
    data: query
  })
}

// 绑定司机
export function driverBind (query) {
  return request({
    url: '/system/scDriver/bindDriver',
    method: 'post',
    data: query
  })
}

// 启用禁用车辆
export function useDisCar (query) {
  return request({
    url: '/system/scCar/updateCarStatus',
    method: 'put',
    data: query
  })
}
