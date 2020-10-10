<!-- 车辆与司机绑定 -->
<template>
  <div class='driver-bind'>
    <div class="top-select">
      <el-row :gutter="10"
              class="mb8">
        <el-col :span="1.5">
          <el-button type="primary"
                     size="mini"
                     :disabled="single"
                     @click="sureBind">确定</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="info"
                     size="mini"
                     @click="cancelBind">取消</el-button>
        </el-col>
      </el-row>

      <el-table v-loading="loading"
                :data="carList"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" prop="driverId" />
        <el-table-column label="姓名" prop="driverName" width="80" />
        <el-table-column label="性别" prop="driverSex" width="60" />
        <el-table-column label="证件号码" align="center" prop="driverIdNumber" width="120" />
        <el-table-column label="年龄" prop="driverAge" width="60" />
        <el-table-column label="联系地址" align="center" prop="address" />
        <el-table-column label="联系电话" align="center" prop="driverPhoneNumbe" width="180" />
        <el-table-column label="邮箱" prop="emai" />
        <el-table-column label="司机类型" prop="driverType" width="80" :formatter="dtFormatter"/>
        <el-table-column label="驾照类型" prop="licenseType" width="80" />
        <el-table-column label="驾驶年限" align="center" prop="drivingYears" width="80" />
        <el-table-column label="司机状态" align="center" prop="driverStatus" width="80" />
        <el-table-column label="备注" prop="remarks" />
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
import { listDriver, driverBind } from "@/api/normal/carmanage";
import { getUrlKey } from '@/utils/index';
export default {
  components: {},
  //props:  {type: Number或[Number, String], default: 0, required: true}
  props: {},
  data () {
    return {
      queryParams: {
        pageNumber: 1,
        pageSize: 10
      },
      loading: true,
      // 选中数组
      ids: [],
      selectItems: [],
      // 非单个禁用
      single: true,
      // 总条数
      total: 0,
    };
  },
  methods: {
    /** 查询车辆列表 */
    getList () {
      this.loading = true;
      console.log(this.queryParams)
      listDriver(this.queryParams).then(response => {
          console.log(response)
        this.carList = response.rows;
        this.total = response.total;
        this.loading = false;
       });
    },
    // 确定
    sureBind () {
      const ids = this.ids;
      console.log(ids)
      const data={
        carId:getUrlKey("id",window.location.href),
        driverId:ids.join(",")
      }
      this.$confirm('是否确认绑定该司机', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return driverBind(data);
        }).then(() => {
          this.$router.go(-1)
        }).catch(function() {});

      // this.$router.go(-1)
    },
    // 取消
    cancelBind () {
      this.$router.go(-1)
    },
    // 选择列表
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.driverId);

      this.single = selection.length != 1
    },
    // 格式化列表显示
    dtFormatter (row, column) {
      /** 司机类型 0内部车辆  1外部车辆 */
      if (row.driverType==='0') {
        return '内部车辆'
      } else {
        return '外部车辆'
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
.driver-bind {
  padding: 20px;
}
</style>
