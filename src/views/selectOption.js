// 页面公有下拉选项
import { getscCarFleetList } from "@/api/normal/drivermanager";

const commSelect = {
  //驾照类型
  licenseTypeOptions: [
    {
      "label": "A1",
      "value": "A1"
    }, {
      "label": "A2",
      "value": "A2"
    }, {
      "label": "B1",
      "value": "B1"
    }, {
      "label": "B2",
      "value": "B2"
    }, {
      "label": "C1",
      "value": "C1"
    }, {
      "label": "C2",
      "value": "C2"
    }
  ],
  // 用车类型 / Type =====  carType
  carTypeOptions: [
    {
      "label": "全部",
      "value": ""
    }, {
      "label": "接机",
      "value": "接机"
    }, {
      "label": "送机",
      "value": "送机"
    }, {
      "label": "带客接机",
      "value": "带客接机"
    }, {
      "label": "带客送机",
      "value": "带客送机"
    }, {
      "label": "包车",
      "value": "包车"
    }, {
      "label": "内部用车",
      "value": "内部用车"
    }, {
      "label": "免费用车",
      "value": "免费用车"
    }, {
      "label": "折扣用车",
      "value": "折扣用车"
    }, {
      "label": "自驾长租",
      "value": "自驾长租"
    }, {
      "label": "自驾短租",
      "value": "自驾短租"
    }
  ],
  // 车辆级别/ Car Level  =====  carLevel
  carLevelOptions: [
    {
      "label": "全部",
      "value": ""
    }, {
      "label": "舒适型",
      "value": "舒适型"
    }, {
      "label": "豪华型",
      "value": "豪华型"
    }, {
      "label": "商务型",
      "value": "商务型"
    }
  ],
  // 车辆类型/ Car Type
  carOptions: [
    {
      "label": "全部",
      "value": ""
    }, {
      "label": "Audi A6L",
      "value": "Audi A6L"
    }, {
      "label": "BENZ E300L",
      "value": "BENZ E300L"
    }, {
      "label": "BMW 530Li",
      "value": "BMW 530Li"
    }
  ],
  // 客户公司名称/ Company Name
  companyNameOptions: [
    {
      "label": "全部",
      "value": ""
    }, {
      "label": "北京璞瑄酒店",
      "value": "北京璞瑄酒店"
    }, {
      "label": "北京希尔顿逸林酒店",
      "value": "北京希尔顿逸林酒店"
    }, {
      "label": "北京人卫酒店",
      "value": "北京人卫酒店"
    },{
      "label": "北京新侨诺富特酒店",
      "value": "北京新侨诺富特酒店"
    }, {
      "label": "北京新世界酒店",
      "value": "北京新世界酒店"
    }, {
      "label": "北京索菲特大酒店",
      "value": "北京索菲特大酒店"
    }, {
      "label": "北京泛太平洋酒店",
      "value": "北京泛太平洋酒店"
    }, {
      "label": "北京临空皇冠假日酒店",
      "value": "北京临空皇冠假日酒店"
    }, {
      "label": "北京天伦松鹤大酒店",
      "value": "北京天伦松鹤大酒店"
    }, {
      "label": "北京唐拉雅秀酒店",
      "value": "北京唐拉雅秀酒店"
    }, {
      "label": "深圳塞乐威平台",
      "value": "深圳塞乐威平台"
    }
  ],
  // 订单状态/Order Status
  orderStatusOptions: [
    {
      "label": "全部",
      "value": ""
    }, {
      "label": "未派单",
      "value": "未派单"
    }, {
      "label": "已派单司机未确认",
      "value": "已派单司机未确认"
    }, {
      "label": "已派单司机已确认",
      "value": "已派单司机已确认"
    }, {
      "label": "已派单司机已出车",
      "value": "已派单司机已出车"
    }, {
      "label": "已派单车辆已就位",
      "value": "已派单车辆已就位"
    }, {
      "label": "已派单乘客未上车",
      "value": "已派单乘客未上车"
    }, {
      "label": "已派单乘客已上车",
      "value": "已派单乘客已上车"
    }, {
      "label": "已派单服务中",
      "value": "已派单服务中"
    }, {
      "label": "已派单乘客已下车",
      "value": "已派单乘客已下车"
    }, {
      "label": "服务已完成",
      "value": "服务已完成"
    }, {
      "label": "待取消订单",
      "value": "待取消订单"
    }, {
      "label": "已取消订单",
      "value": "已取消订单"
    }
  ],
  // 车辆归属/Car Ascription
  carAscriptionOptions: [
    {
      "label": "全部",
      "value": ""
    }, {
      "label": "内部车辆",
      "value": 0
    }, {
      "label": "外部车辆",
      "value": 1
    }
  ],
  // 组别/ Car Group
  carGroupOptions: [
    {
      "label": "全部",
      "value": ""
    }, {
      "label": "一组",
      "value": "一组"
    }, {
      "label": "二组",
      "value": "二组"
    }, {
      "label": "三组",
      "value": "三组"
    }, {
      "label": "四组",
      "value": "四组"
    }, {
      "label": "五组",
      "value": "五组"
    }, {
      "label": "六组",
      "value": "六组"
    }
  ],
  // 车辆状态/Car State
  carStateOptions: [
    {
      "label": "全部",
      "value": ""
    }, {
      "label": "启用",
      "value": 0
    }, {
      "label": "禁用",
      "value": 1
    }
  ],
  // 司机状态
  driverStateOptions: [
    {
      "label": "全部",
      "value": ""
    }, {
      "label": "启用",
      "value": 0
    }, {
      "label": "禁用",
      "value": 1
    }
  ],

  // 新增====没有全部选项
  // 新增车辆级别
  addCarLevelOptions: [
    {
      "label": "舒适型",
      "value": "舒适型"
    }, {
      "label": "豪华型",
      "value": "豪华型"
    }, {
      "label": "商务型",
      "value": "商务型"
    }
  ],
  // 新增车辆类型
  addCarOptions: [
    {
      "label": "Audi A6L",
      "value": "Audi A6L"
    }, {
      "label": "BENZ E300L",
      "value": "BENZ E300L"
    }, {
      "label": "BMW 530Li",
      "value": "BMW 530Li"
    }
  ],
  // 新增组别
  addCarGroupOptions: [
    {
      "label": "一组",
      "value": "一组"
    }, {
      "label": "二组",
      "value": "二组"
    }, {
      "label": "三组",
      "value": "三组"
    }, {
      "label": "四组",
      "value": "四组"
    }, {
      "label": "五组",
      "value": "五组"
    }, {
      "label": "六组",
      "value": "六组"
    }
  ],
  // 新增车辆状态
  addCarStateOptions: [
    {
      "label": "启用",
      "value": 0
    }, {
      "label": "禁用",
      "value": 1
    }
  ],
  // 新增车辆归属
  addCarAscriptionOptions: [
    {
      "label": "内部车辆",
      "value": 0
    }, {
      "label": "外部车辆",
      "value": 1
    }
  ],
  // 新增用车类型
  addCarTypeOptions: [
    {
      "label": "接机",
      "value": "0"
    }, {
      "label": "送机",
      "value": "1"
    }, {
      "label": "带客接机",
      "value": "2"
    }, {
      "label": "带客送机",
      "value": "3"
    }, {
      "label": "包车",
      "value": "4"
    }, {
      "label": "内部用车",
      "value": "5"
    }, {
      "label": "免费用车",
      "value": "6"
    }, {
      "label": "折扣用车",
      "value": "7"
    }, {
      "label": "自驾长租",
      "value": "8"
    }, {
      "label": "自驾短租",
      "value": "9"
    }
  ],
  // 新增客户公司名称
  addCompanyNameOptions: [
    {
      "label": "北京璞瑄酒店",
      "value": "北京璞瑄酒店"
    }, {
      "label": "北京希尔顿逸林酒店",
      "value": "北京希尔顿逸林酒店"
    }, {
      "label": "北京人卫酒店",
      "value": "北京人卫酒店"
    }, {
      "label": "北京新侨诺富特酒店",
      "value": "北京新侨诺富特酒店"
    }, {
      "label": "北京新世界酒店",
      "value": "北京新世界酒店"
    }, {
      "label": "北京索菲特大酒店",
      "value": "北京索菲特大酒店"
    }, {
      "label": "北京泛太平洋酒店",
      "value": "北京泛太平洋酒店"
    }, {
      "label": "北京临空皇冠假日酒店",
      "value": "北京临空皇冠假日酒店"
    }, {
      "label": "北京天伦松鹤大酒店",
      "value": "北京天伦松鹤大酒店"
    }, {
      "label": "北京唐拉雅秀酒店",
      "value": "北京唐拉雅秀酒店"
    }, {
      "label": "深圳塞乐威平台",
      "value": "深圳塞乐威平台"
    }
  ],
  // 新增客户部门/Customer Department
  addCustomerDepartmentOptions: [
    {
      "label": "礼宾部",
      "value": "礼宾部"
    }, {
      "label": "合作伙伴",
      "value": "合作伙伴"
    }, {
      "label": "供应商管理部",
      "value": "供应商管理部"
    }, {
      "label": "前厅部",
      "value": "前厅部"
    }
  ],
  // 新增客户职位/Customer Position
  addCustomerPositiontOptions: [
    {
      "label": "经理",
      "value": "经理"
    }, {
      "label": "总监",
      "value": "总监"
    }, {
      "label": "主管",
      "value": "主管"
    }, {
      "label": "总经理",
      "value": "总经理"
    }, {
      "label": "职员",
      "value": "职员"
    }
  ],
  // 新增联系人/Contacts
  addContactsOptions: [
    {
      "label": "高亮/Mason",
      "value": "高亮/Mason"
    }, {
      "label": "韩达/Hunter",
      "value": "韩达/Hunter"
    }, {
      "label": "王楠",
      "value": "王楠"
    }, {
      "label": "陈天聪/Billy",
      "value": "陈天聪/Billy"
    }, {
      "label": "张鹏",
      "value": "张鹏"
    }, {
      "label": "栗奇/Leo",
      "value": "栗奇/Leo"
    }, {
      "label": "宋大明",
      "value": "宋大明"
    }, {
      "label": "郭秋丰/Gary",
      "value": "郭秋丰/Gary"
    }, {
      "label": "牛军",
      "value": "牛军"
    }, {
      "label": "郭帅/Gary",
      "value": "郭帅/Gary"
    }, {
      "label": "赵清",
      "value": "赵清"
    }
  ],
  // 新增客人级别/ Guest Level
  addGuestLevelOptions: [
    {
      "label": "要客/CIP",
      "value": "要客/CIP"
    }, {
      "label": "贵宾/VIP",
      "value": "贵宾/VIP"
    }
  ],
  // 新增折扣比例/ Discount Proportion
  addDiscountProportionOptions: [
    {
      "label": "无",
      "value": ""
    }, {
      "label": "9.5折",
      "value": "0.95"
    }, {
      "label": "9折",
      "value": "0.9"
    }, {
      "label": "8.5折",
      "value": "0.85"
    }, {
      "label": "8折",
      "value": "0.8"
    }, {
      "label": "7.5折",
      "value": "0.75"
    }, {
      "label": "7折",
      "value": "0.7"
    }, {
      "label": "6.5折",
      "value": "0.65"
    }, {
      "label": "6折",
      "value": "0.6"
    }, {
      "label": "5.5折",
      "value": "0.55"
    }, {
      "label": "5折",
      "value": "0.5"
    }
  ],
  // 新增司机/Driver
  addGriverOptions: [
    {
      "label": "李阳",
      "value": "李阳"
    }, {
      "label": "网三",
      "value": "网三"
    }, {
      "label": "刘爱",
      "value": "刘爱"
    }
  ]
}

// 添加订单下拉选项
const orderAddSelect = {






}

// 车辆选择下拉选项
const carSelect = {
  // 性别/Sex
  sexOptions: [
    {
      "label": "全部",
      "value": ""
    }, {
      "label": "男",
      "value": "男"
    }, {
      "label": "女",
      "value": "女"
    }
  ]
}



export { commSelect, orderAddSelect, carSelect}
