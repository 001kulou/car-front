<!-- 收费标准 -->
<template>
  <div class='cost-manage'>
    <div class="top-select">
      <el-form ref="queryForm"
               :model="queryParams"
               size="small"
               :inline="true">
        <el-form-item label="用车类型/Type"
                      prop="carType">
          <el-select v-model="queryParams.carType"
                     placeholder="请选择用车类型/Type"
                     style="width: 240px">
            <el-option v-for="(item, index) in carTypeOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
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
      </el-row>

      <el-table v-loading="loading"
                :data="costList"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"  prop="id" />
        <el-table-column label="用车类型" prop="carType" width="120" />
        <el-table-column label="车辆级别" prop="carLevel"  width="150" />
        <el-table-column label="基础费用" prop="basicExpenses" width="150" />
        <el-table-column label="包含里程数" prop="includeMileage" width="100" />
        <el-table-column label="包含时长" prop="includeDuration" width="100" />
        <el-table-column label="超公里价格" prop="pricePerKilometer" width="100" />
        <el-table-column label="超小时价格" prop="overHourPrice" width="100" />
        <el-table-column label="备注" prop="remarks" width="100" />
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNumber"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"/>
    </div>

    <!-- 添加或修改收费对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
         <el-form-item label="用车类型" prop="carType">
          <el-select v-model="form.carType" placeholder="请选择用车类型">
            <el-option v-for="(item, index) in addCarTypeOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆级别" prop="carLevel">
          <el-select v-model="form.carLevel" placeholder="请选择车辆级别">
            <el-option v-for="(item, index) in addCarLevelOptions"
                       :key="index"
                       :label="item.label"
                       :value="item.value"
                       :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基础费用" prop="basicExpenses">
          <el-input v-model="form.basicExpenses"  placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="包含里程数" prop="includeMileage">
          <el-input v-model="form.includeMileage"  placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="包含时长" prop="includeDuration">
          <el-input v-model="form.includeDuration"  placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label=" 超公里价格" prop="pricePerKilometer">
          <el-input v-model="form.pricePerKilometer"  placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label=" 超小时价格" prop="overHourPrice">
          <el-input v-model="form.overHourPrice"  placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listCost, addCost, editCost, delCost } from "@/api/normal/costmanage";
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
      },
      carTypeOptions: commSelect.carTypeOptions,
      carLevelOptions: commSelect.carLevelOptions,
      addCarTypeOptions: commSelect.addCarTypeOptions,  //新增用车类型
      addCarLevelOptions: commSelect.addCarLevelOptions,  //新增车辆级别

      costList: [],
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
    /** 查询收费列表 */
    getList() {
      this.loading = true;
      console.log(this.queryParams)
      listCost(this.queryParams).then( response => {
          console.log(response)
          this.costList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
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
    // 表单重置
    reset() {
      this.form = {
        carType: '',
        carLevel: '',
        basicExpenses: '',
        includeMileage: '',
        includeDuration: '',
        pricePerKilometer: '',
        overHourPrice: '',
        remark: ''
      };
      this.resetForm("form");
    },
    // 新增
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "新增收费标准";
    },
    // 修改
    handleUpdate () {
      // console.log(this.ids)
      // console.log(this.selectItems)
      this.reset();
      this.form = this.selectItems[0]
      this.open = true;
      this.title = "修改收费标准";
    },
    // 删除
    handleDelete () {
      const delIds = this.ids.join(',');
      this.$confirm('是否确认删除?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          var ids={
            "ids":delIds
          }
          return delCost(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    // 选择列表
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.selectItems = selection
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // console.log(this.form);
          if(this.form.id){
            editCost(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          }else{
            addCost(this.form).then(response => {
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
.cost-manage {
  padding: 20px;
}
</style>
