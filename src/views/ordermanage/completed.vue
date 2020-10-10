<!-- 已完成订单 -->
<template>
  <div class='order-completed'>
    <div class="top-select">
      <el-form ref="queryForm"
               :model="queryParams"
               size="small"
               :inline="true">
        <!-- 用车类型/Car Type -->
        <el-form-item label="用车类型"
                      prop="carType">
          <el-select v-model="queryParams.carType"
                     placeholder="请选择用车类型"
                     style="width: 240px">
            <el-option v-for="(item, index) in carTypeOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <!-- 客人姓名/Guest Name -->
        <el-form-item label="客人姓名"
                      prop="carSelect">
          <el-input v-model="queryParams.carSelect"
                    placeholder="请输入客人姓名"
                    clearable
                    size="small"
                    style="width: 240px" />
        </el-form-item>
        <!-- 客人电话/Contact -->
        <el-form-item label="客人电话"
                      prop="carSelect">
          <el-input v-model="queryParams.carSelect"
                    placeholder="请输入客人电话"
                    clearable
                    size="small"
                    style="width: 240px" />
        </el-form-item>
        <!-- 航班号/Flight No. -->
        <el-form-item label="航班号"
                      prop="carSelect">
          <el-input v-model="queryParams.carSelect"
                    placeholder="请输入航班号"
                    clearable
                    size="small"
                    style="width: 240px" />
        </el-form-item>
        <!-- 车辆级别/Car Level -->
        <el-form-item label="车辆级别"
                      prop="carLevel">
          <el-select v-model="queryParams.carLevel"
                     placeholder="请选择车辆级别"
                     style="width: 240px">
            <el-option v-for="(item, index) in carLevelOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <!-- 车辆类型/Car Type -->
        <el-form-item label="车辆类型"
                      prop="carType">
          <el-select v-model="queryParams.carType"
                     placeholder="请选择车辆类型"
                     style="width: 240px">
            <el-option v-for="(item, index) in carOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <!-- 客户公司名称/Company Name -->
        <el-form-item label="客户公司名称"
                      prop="carType">
          <el-select v-model="queryParams.carType"
                     placeholder="请选择客户公司名称"
                     style="width: 240px">
            <el-option v-for="(item, index) in companyNameOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <!-- 订单号/Order No. -->
        <el-form-item label="订单号"
                      prop="carSelect">
          <el-input v-model="queryParams.carSelect"
                    placeholder="请输入订单号"
                    clearable
                    size="small"
                    style="width: 240px" />
        </el-form-item>
        <!-- 出发时间/Departure Time -->
        <el-form-item label="出发时间">
          <el-date-picker v-model="queryParams.carSelect"
                        placeholder="出发时间"
                        type="datetime"
                        clearable
                        size="small"
                        style="width: 240px" />
        </el-form-item>
        <!-- 订单状态/Order Status -->
        <el-form-item label="订单状态"
                      prop="carType">
          <el-select v-model="queryParams.carType"
                     placeholder="请选择订单状态"
                     style="width: 240px">
            <el-option v-for="(item, index) in orderStatusOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <!-- 搜索、重置 -->
        <el-form-item>
          <el-button type="primary"
                     icon="el-icon-search"
                     size="mini"
                     @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh"
                     size="mini"
                     @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" size="mini" @click="exportList">导出</el-button>
      </div>
      <el-table v-loading="loading"
                :data="listOrder"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55"
                         align="center" />
        <el-table-column label="订单号"
                         prop="carLevel"
                         width="150" />
        <el-table-column label="客人姓名"
                         prop="vehicleBrand"
                         width="120" />
        <el-table-column label="客人电话"
                         prop="carType"
                         width="120" />
        <el-table-column label="客人级别"
                         prop="carSelect"
                         width="150" />
        <el-table-column label="用车类型"
                         prop="fleetName"
                         width="100" />
        <el-table-column label="车辆级别"
                         prop="number"
                         width="100" />
        <el-table-column label="车型"
                         prop="carStatus"
                         width="100" />
        <el-table-column label="车牌"
                         prop="vehicleOwnership"
                         width="100" />
        <el-table-column label="出发地点"
                         prop="driverName"
                         width="100" />
        <el-table-column label="到达地点"
                         prop="driverSex"
                         width="100" />
        <el-table-column label="出发时间"
                         prop="driverPhoneNumbe"
                         width="100" />
        <el-table-column label="客户公司名称"
                         prop="driverType"
                         width="100" />
        <el-table-column label="客户部门"
                         prop="driverStatus"
                         width="100" />
        <el-table-column label="订单状态"
                         prop="driverType"
                         width="100" />
        <el-table-column label="其他信息"
                         prop="driverStatus"
                         width="100" />
        <el-table-column label="备注"
                         prop="remarks"
                         width="100" />
      </el-table>
      <pagination v-show="total>0"
                  :total="total"
                  :page.sync="queryParams.pageNum"
                  :limit.sync="queryParams.pageSize"
                  @pagination="getList" />
    </div>
  </div>
</template>

<script>
import { driverListPost } from "@/api/normal/ordermanage";
import { commSelect } from "../selectOption"
export default {
  components: {},
  //props:  {type: Number或[Number, String], default: 0, required: true}
  props: {},
  data () {
    return {
      // 查询参数
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
        carType: "",
        carLevel: "",
        carSelect: "",
        vehicleOwnership: "",
        carStatus: "",
        driverStatus: "",
        fleetName: "",
        orderStatus:2,
      },
      ids: "",
      listOrder: [],
      total: 0,
      // 下拉选项
      carTypeOptions: commSelect.carTypeOptions,
      carLevelOptions: commSelect.carLevelOptions,
      carOptions: commSelect.carOptions,
      companyNameOptions: commSelect.companyNameOptions,
      orderStatusOptions: commSelect.orderStatusOptions,
    };
  },
  methods: {
    /** 查询车辆列表 */
    getList () {
      this.loading = true;
      // console.log(this.queryParams)
      driverListPost(this.queryParams).then(
        response => {
        this.listOrder = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 搜索
    handleQuery () {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 重置
    resetQuery () {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 选择列表
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.carId)
    },
    // 导出
    exportList () {

    }
  },
  computed: {},
  watch: {},
  created () {
    this.getList();
  },
  mounted () {

  },
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.order-completed {
  padding: 20px;
}
</style>
