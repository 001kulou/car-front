<!-- 订单列表 -->
<template>
  <div class='order-index'>
    <div class="top-card">

      <div>
        <i class="el-icon-document"></i>
        <span class="name">订单总数:</span>
        <span class="num">{{totalOrders}}</span>
      </div>
      <div>
        <i class="el-icon-document-delete"></i>
        <span class="name">未派订单:</span>
        <span class="num">{{undeliveredOrder}}</span>
      </div>
      <div>
        <i class="el-icon-document-add"></i>
        <span class="name">已派订单:</span>
        <span class="num">{{ordersSent}}</span>
      </div>
      <div>
        <i class="el-icon-document-checked"></i>
        <span class="name">已完成订单:</span>
        <span class="num">{{orderCompleted}}</span>
      </div>
      <!-- <div v-for="(item,index) in cardData"
           :key="index">
        <i :class="item.icon"></i>
        <span class="name">{{item.name}}:</span>
        <span class="num">{{item.num}}</span>
      </div> -->
    </div>
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
      <el-row :gutter="10"
              class="mb8">
        <el-col :span="1.5">
          <el-button type="primary"
                     icon="el-icon-plus"
                     size="mini"
                     :disabled="multiple"
                     @click="cancelOrder">取消订单</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success"
                     icon="el-icon-edit"
                     size="mini"
                     @click="addOrder">添加订单</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger"
                     icon="el-icon-delete"
                     size="mini"
                     :disabled="single"
                     @click="editOrder">修改订单</el-button>
        </el-col>
       <!-- <el-col :span="1.5">
          <el-button type="warning" plain
                     icon="el-icon-user"
                     size="mini"
                     @click="importOrder">导入</el-button>
        </el-col> -->

        <el-col :span="1.5">
          <el-button type="warning"
                     icon="el-icon-circle-check"
                     size="mini"
                     @click="exportOrder">导出</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="info"
                    icon="el-icon-circle-close"
                    size="mini"
                    :disabled="single"
                    @click="dispatchOrder">一键派单</el-button>
        </el-col>
      </el-row>

      <el-table v-loading="loading"
                :data="listOrder"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55"
                         align="center" />
        <el-table-column label="订单号"
                         prop="orderId"
                         width="150" />
        <el-table-column label="客人姓名"
                         prop="guestName"
                         width="120" />
        <el-table-column label="客人电话"
                         prop="guestNumber"
                         width="120" />
        <el-table-column label="客人级别"
                         prop="guestLeve"
                         width="150" />
        <el-table-column label="用车类型"
                         prop="carType"
                         width="100" />
        <el-table-column label="车辆级别"
                         prop="carLevel"
                         width="100" />
        <el-table-column label="车型"
                         prop="carType"
                         width="100" />
        <el-table-column label="车牌号"
                         prop="carSelect"
                         width="100" />
        <el-table-column label="出发地点"
                         prop="driverName"
                         width="100" />
        <el-table-column label="到达地点"
                         prop="arrivalPlace"
                         width="100" />
        <el-table-column label="出发时间"
                         prop="driverPhoneNumbe"
                         width="100" />
        <el-table-column label="客户公司名称"
                         prop="companyName"
                         width="100" />
        <el-table-column label="客户部门"
                         prop="customerDepartment"
                         width="100" />
        <el-table-column label="订单状态"
                         prop="orderStatus"
                         :formatter="carStatusatter"
                         width="100" />
        <el-table-column label="其他信息"
                         prop="ortherInfo"
                         width="100" />
        <el-table-column label="备注"
                         prop="remarks"
                         width="100" />
      </el-table>
      <pagination v-show="total>0"
                  :total="total"
                  :page.sync="queryParams.pageNumber"
                  :limit.sync="queryParams.pageSize"
                  @pagination="getList" />
    </div>
  </div>
</template>

<script>
import { driverListPost,orderNumberList,onekey } from "@/api/normal/ordermanage";
import { commSelect } from "../selectOption"
export default {
  components: {},
  //props:  {type: Number或[Number, String], default: 0, required: true}
  props: {},
  data () {
    return {

      cardData:[],
      /* cardData: [
        {
          icon: 'el-icon-document',
          name: '订单总数',
          num: 1234
        },
        {
          icon: 'el-icon-document-delete',
          name: '订单总数',
          num: 1234
        },
        {
          icon: 'el-icon-document-add',
          name: '订单总数',
          num: 1234
        },
        {
          icon: 'el-icon-document-checked',
          name: '订单总数',
          num: 1234
        },
      ], */
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
        orderStatus:""
      },
      // 下拉选项
      carTypeOptions: commSelect.carTypeOptions,
      carLevelOptions: commSelect.carLevelOptions,
      carOptions: commSelect.carOptions,
      companyNameOptions: commSelect.companyNameOptions,
      orderStatusOptions: commSelect.orderStatusOptions,

      listOrder: [],
      loading: true,
      // 选中数组
      ids: [],
      selectItems: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      orderCompleted:0,
      ordersSent:0,
      totalOrders:0,
      undeliveredOrder:0,
    };
  },
  methods: {
     getLists () {
       console.log(111)
      orderNumberList().then(response => {
        console.log(response)
      });
     },
    /** 查询车辆列表 */
    getList () {
      this.loading = true;
      // console.log(this.queryParams)
      orderNumberList().then(response => {
        console.log(response)
        this.orderCompleted = response.rows[0].orderCompleted;
        this.ordersSent = response.rows[0].ordersSent;
        this.totalOrders = response.rows[0].totalOrders;
        this.undeliveredOrder = response.rows[0].undeliveredOrder;
      });
      driverListPost(this.queryParams).then(
        response => {
          console.log(response)
          this.listOrder = response.rows;
          this.total = response.total;
          // this.cardData.num = response.total;
          this.loading = false;
        }
      );
    },
    // 搜索
    handleQuery () {
      this.queryParams.pageNumber = 1;
      this.getList();
    },
    // 重置
    resetQuery () {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 选择列表
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.orderId)
      this.selectItems = selection
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    // 取消订单
    cancelOrder () {

    },
    // 添加订单
    addOrder () {
      this.$router.push({
        path: '/orderoption/addorder',
        // query: {
        //   id: this.ids[0]
        // }
      })
    },
    // 修改订单
    editOrder () {

    },
    // 导入
    importOrder () {

    },
    // 导出
    exportOrder () {

    },
    // 一键派单
    dispatchOrder () {
      onekey({id: this.ids.join(",")}).then(response => {
        if (response.code === 200) {
          this.msgSuccess("派单成功");
          this.open = false;
          this.getList();
        }
      })
    },
    // 车辆状态
    carStatusatter (row) {
      if (row.orderStatus===0) {
        return '未派单'
      } else if(row.orderStatus===1) {
        return '已派单'
      } else if(row.orderStatus===2) {
        return '派单完成'
      } else if(row.orderStatus===3) {
        return '订单被拒绝'
      }
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
//@import url(); 引入公共css类order-index
.order-index {
  padding: 20px;
  .top-card {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    & > div {
      padding: 10px 30px 10px 10px;
      border-radius: 4px;
      box-shadow: 5px 5px 10px 5px #ccc;;
      color: #fff;
      display: flex;
      align-items: center;
      flex-grow: 1;
      margin-right: 25px;
      &:nth-of-type(1) {
        background: #42a9ce;
      }
      &:nth-of-type(2) {
        background: #ec5aa1;
      }
      &:nth-of-type(3) {
        background: #fedf34;
      }
      &:nth-of-type(4) {
        background: #d0e17d;
      }
      i {
        font-size: 46px;
      }
      .name {
        font-weight: bold;
        margin-right: 16px;
      }
      .num {
        font-size: 26px;
        font-weight: bold;
      }
    }
  }
}
</style>
