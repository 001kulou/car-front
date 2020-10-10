<!-- 选择车辆 -->
<template>
  <div class='car-select'>
    <div class="top-select">

      <div>
        <el-button type="primary" size="mini" @click="comfort">确定</el-button>
      </div>
      <el-table v-loading="loading"
                :data="carList">
        <el-table-column label="选择" width="65">
          <template scope="scope">
            <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.row)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="车辆级别"
                         prop="carLevel"
                         width="150" />
        <el-table-column label="品牌"
                         prop="vehicleBrand"
                         width="120" />
        <el-table-column label="车辆类型"
                         prop="carType"
                         width="120" />
        <el-table-column label="车牌号"
                         prop="carSelect"
                         width="150" />
        <el-table-column label="组别"
                         prop="fleetName"
                         width="100" />
        <el-table-column label="准乘人数"
                         prop="number"
                         width="100" />
        <el-table-column label="车辆状态"
                         prop="carStatus"
                         width="100" />
        <el-table-column label="车辆归属"
                         prop="vehicleOwnership"
                         :formatter="ownershipFormatter"
                         width="100" />
        <el-table-column label="司机姓名"
                         prop="driverName"
                         width="100" />
        <el-table-column label="性别"
                         prop="driverSex"
                         width="100" />
        <el-table-column label="司机联系电话"
                         prop="driverPhoneNumbe"
                         width="100" />
        <el-table-column label="司机归属"
                         prop="driverType"
                         width="100" />
        <el-table-column label="司机状态"
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
import { orderBindCarList } from "@/api/normal/ordermanage";
import { commSelect } from "../selectOption"
export default {
  components: {},
  //props:  {type: Number或[Number, String], default: 0, required: true}
  props: {},
  data () {
    return {
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        carType: "",
        carLevel: "",
        carSelect: "",
        vehicleOwnership: "",
        carStatus: "",
        driverStatus: "",
        fleetName: ""
      },
      radio: "",
      selectId: "",
      carLevel:'',
      vehicleBrand:'',
      carType:'',
      carSelect:"",
      driverId:'',
      fleetName: "",
      driverName:"",
      driverPhoneNumbe:"",
      carList: [],
      total: 0,
      // 下拉选项
      carLevelOptions: commSelect.carLevelOptions,  //车辆级别
      carOptions: commSelect.carOptions,
      carOwnerOptions: commSelect.carAscriptionOptions,
      carGroupOptions: commSelect.carGroupOptions,
      carStateOptions: commSelect.carStateOptions,
      driverStateOptions: commSelect.driverStateOptions,
      addCarLevelOptions: commSelect.addCarLevelOptions,  //新增车辆级别
      addCarOptions: commSelect.addCarOptions,  //新增车辆类型
      addCarGroupOptions: commSelect.addCarGroupOptions,  //新增组别
      addCarStateOptions: commSelect.addCarStateOptions,  //新增车辆状态
      addCarAscriptionOptions: commSelect.addCarAscriptionOptions,  //新增车辆归属
    };
  },
  methods: {
    /** 查询车辆列表 */
    getList () {
      this.loading = true;
      // console.log(this.queryParams)
      orderBindCarList(this.queryParams).then(
        response => {
        this.carList = response.rows;
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
    getCurrentRow (row) {
      console.log(row)
      this.selectId = row.carId;
      this.carLevel = row.carLevel;
      this.vehicleBrand = row.vehicleBrand;
      this.carType = row.carType;
      this.carSelect = row.carSelect;
      this.driverId = row.driverId;
      this.fleetName = row.fleetName;
      this.driverName = row.driverName,
      this.driverPhoneNumbe = row.driverPhoneNumbe

    },
    comfort () {
      this.$router.push({
        path: '/orderoption/addorder',
        query: {
          id: this.selectId,
          carLevel:this.carLevel,
          vehicleBrand:this.vehicleBrand,
          carType:this.carType,
          carSelect:this.carSelect,
          driverId:this.driverId,
          fleetName:this.fleetName,
          driverName:this.driverName,
          driverPhoneNumbe:this.driverPhoneNumbe

        }
      })
    },
    // 表格格式化
    // 车辆归属
    ownershipFormatter (row) {
      if (row.vehicleOwnership===1) {
        return '外部'
      } else if(row.vehicleOwnership===0) {
        return '内部'
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
//@import url(); 引入公共css类
.car-select {
  padding: 20px;
  .el-table{
    /deep/ .el-radio .el-radio__label{
      display: none;
    }
    /deep/ .el-radio .el-radio__input {
      padding-left: 6px;
    }
  }
}
</style>
