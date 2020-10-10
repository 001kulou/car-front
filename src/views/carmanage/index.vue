<!-- 车辆管理 -->
<template>
  <div class='car-manage'>
    <div class="top-select">
      <el-form ref="queryForm"
               :model="queryParams"
               size="small"
               :inline="true">
        <!-- 车辆级别/Car Level -->
        <el-form-item label="车辆级别/Car Level"
                      prop="carLevel">
          <el-select v-model="queryParams.carLevel"
                     placeholder="请选择车辆级别/Car Level"
                     style="width: 240px">
            <el-option v-for="(item, index) in carLevelOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <!-- 车辆类型/Car Type -->
        <el-form-item label="车辆类型/Car Type"
                      prop="carType">
          <el-select v-model="queryParams.carType"
                     placeholder="请选择车辆类型/Car Type"
                     style="width: 240px">
            <el-option v-for="(item, index) in carOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <!-- 车牌号/Car No. -->
        <el-form-item label="车牌号/Car No."
                      prop="carSelect">
          <el-input v-model="queryParams.carSelect"
                    placeholder="请输入车牌号"
                    clearable
                    size="small"
                    style="width: 240px" />
        </el-form-item>
        <!-- 车辆归属/Car Ascription -->
        <el-form-item label="车辆归属/Car Ascription"
                      prop="vehicleOwnership">
          <el-select v-model="queryParams.vehicleOwnership"
                     placeholder="请选择车辆归属/Car Ascription"
                     style="width: 240px">
            <el-option v-for="(item, index) in carOwnerOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <!-- 组别/Car Group -->
        <el-form-item label="组别/Car Group"
                      prop="fleetName">
          <el-select v-model="queryParams.fleetName"
                     placeholder="请选择组别/Car Group"
                     style="width: 240px">
            <el-option v-for="(item, index) in carGroupOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <!-- 车辆状态/Car State -->
        <el-form-item label="车辆状态/Car State"
                      prop="carStatus">
          <el-select v-model="queryParams.carStatus"
                     placeholder="请选择车辆状态/Car State"
                     style="width: 240px">
            <el-option v-for="(item, index) in carStateOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <!-- 司机状态 -->
        <el-form-item label="司机状态"
                      prop="driverStatus">
          <el-select v-model="queryParams.driverStatus"
                     placeholder="请选择司机状态"
                     style="width: 240px">
            <el-option v-for="(item, index) in driverStateOptions"
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
                     @click="handleAdd">新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success"
                     icon="el-icon-edit"
                     size="mini"
                     :disabled="single"
                     @click="handleUpdate">修改</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger"
                     icon="el-icon-delete"
                     size="mini"
                     :disabled="multiple"
                     @click="handleDelete">删除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="warning" plain
                     icon="el-icon-user"
                     size="mini"
                     :disabled="single"
                     @click="bindDriver">司机绑定</el-button>
        </el-col>

        <el-col :span="1.5">
          <el-button type="warning"
                     icon="el-icon-circle-check"
                     size="mini"
                     :disabled="single"
                     @click="useCar('0')">车辆启用</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="info"
                    icon="el-icon-circle-close"
                    size="mini"
                    :disabled="single"
                    @click="useCar('1')">车辆禁用</el-button>
        </el-col>
      </el-row>

      <el-table v-loading="loading"
                :data="carList"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55"
                         align="center" />
        <el-table-column label="车辆级别"
                         prop="carLevel"
                         width="150" />
        <el-table-column label="品牌"
                         prop="vehicleBrand"
                         width="120" />
        <el-table-column label="车辆类型"
                         prop="carType"
                         width="120" />
        <el-table-column label="车牌"
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
                         :formatter="carStatusatter"
                         width="100" />
       <!-- <el-table-column label="车辆归属"
                         prop="vehicleOwnership"
                         :formatter="ownershipFormatter"
                         width="100" /> -->
        <el-table-column label="司机姓名"
                         prop="driverName"
                         width="100" />
        <el-table-column label="性别"
                         prop="driverSex"
                         :formatter="ownershipFormatter"
                         width="100" />
        <el-table-column label="司机联系电话"
                         prop="driverPhoneNumbe"
                         width="100" />
        <el-table-column label="司机归属"
                         prop="driverType"
                         width="100" />
        <el-table-column label="司机状态"
                         prop="driverStatus"
                         :formatter="driverTypeatter"
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

    <!-- 添加或修改车辆对话框 -->
    <el-dialog :title="title"
               :visible.sync="open"
               width="500px"
               append-to-body>
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="100px">
        <!-- 车辆级别 -->
        <el-form-item label="车辆级别" prop="carLevel">
          <el-select v-model="form.carLevel"
                     placeholder="请选择车辆级别">
            <el-option v-for="(item, index) in addCarLevelOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <!-- 车辆品牌 -->
        <el-form-item label="车辆品牌" prop="vehicleBrand">
          <el-input v-model="form.vehicleBrand"
                    placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- 车辆类型 -->
        <el-form-item label="车辆类型" prop="carType">
          <el-select v-model="form.carType"
                     placeholder="请选择车辆类型">
            <el-option v-for="(item, index) in addCarOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <!-- 组别 -->
        <!-- <el-form-item label="组别" prop="carGroup ">
          <el-select v-model="form.carGroup "
                     placeholder="请选择组别">
            <el-option v-for="(item, index) in addCarGroupOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- 可乘人数 -->
        <el-form-item label="可乘人数" prop="number">
          <el-input v-model="form.number"
                    placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- 车辆状态 0启用 1禁用 -->
        <el-form-item label="车辆状态" prop="carStatus">
          <el-select v-model="form.carStatus"
                     placeholder="请选择车辆状态">
            <el-option v-for="(item, index) in addCarStateOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <!-- 车辆归属 0内部 1外部 -->
        <el-form-item label="车辆归属" prop="vehicleOwnership">
          <el-select v-model="form.vehicleOwnership"
                     placeholder="请选择车辆归属">
            <el-option v-for="(item, index) in addCarAscriptionOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <!-- 车牌号 -->
        <el-form-item label="车牌号" prop="carSelect">
          <el-input v-model="form.carSelect"
                    placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- 备注 -->
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks"
                    type="textarea"
                    placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listCar, addCar, editCar, delCar, useDisCar } from "@/api/normal/carmanage";
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

      carList: [],
      // 遮罩层
      title: "",
      // 是否显示弹出层
      open: false,
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
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  methods: {
    /** 查询车辆列表 */
    getList () {
      this.loading = true;
      console.log(this.queryParams)
      listCar(this.queryParams).then(
        response => {
          console.log(response)
        this.carList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 搜索
    handleQuery () {
      // this.queryParams.pageNum = 1;
      this.getList();
    },
    // 重置
    resetQuery () {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 表单重置
    reset () {
      this.form = {
        carLevel: '',
        vehicleBrand: '',
        carType: '',
        // carGroup: '',
        number: '',
        carStatus: '',
        vehicleOwnership: '',
        carSelect: '',
        remarks: ''
      };
      this.resetForm("form");
    },
    // 新增
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "新增车辆信息";
    },
    // 修改
    handleUpdate () {
      // console.log(this.ids)
      // console.log(this.selectItems)
      this.reset();
      this.form = this.selectItems[0]
      this.open = true;
      this.title = "修改车辆信息";
    },
    // 删除
    handleDelete () {
      const delIds = this.ids.join(',');
      // console.log(delIds)
      const ids = {
         "carIds": delIds
       };
      this.$confirm('是否确认删除?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delCar(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () { });
    },
    // 绑定司机
    bindDriver () {
      this.$router.push({
        path: '/caroption/driverbind',
        query: {
          id: this.ids[0]
        }
      })
    },
    // 启用禁用车辆
    useCar (param) {
      useDisCar({carId: this.ids[0], carStatus:parseInt(param)}).then(response => {
        if (response.code === 200) {
          this.msgSuccess("修改成功");
          this.open = false;
          this.getList();
        }
      })
    },
    // 选择列表
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.carId)
      this.selectItems = selection
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    // 取消按钮
    cancel () {
      this.open = false;
      this.reset();
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.carId) {
            editCar(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addCar(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }

        }
      });
    },

    // 表格格式化
    // 车辆归属
    ownershipFormatter (row) {
      if (row.driverSex==="1") {
        return '女'
      } else if(row.driverSex==="0") {
        return '男'
      }
    },
    // 车辆状态
    carStatusatter (row) {
      if (row.carStatus===1) {
        return '禁用'
      } else if(row.carStatus===0) {
        return '启用'
      }
    },
    // 司机状态
    driverTypeatter (row) {
      if (row.driverType===1) {
        return '外部车辆'
      } else if(row.driverType===0) {
        return '内部车辆'
      }
    },
    // 司机状态
    driverTypeatter (row) {
      if (row.driverType===1) {
        return '外部车辆'
      } else if(row.driverType===0) {
        return '内部车辆'
      }
    },

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
.car-manage {
  padding: 20px;
}
</style>
