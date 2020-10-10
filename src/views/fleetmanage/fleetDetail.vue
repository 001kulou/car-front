<template>
  <div class="app-container">
    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:post:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:post:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:post:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-user"
          size="mini"
          :disabled="single"
          @click="handleCaptain"
          v-hasPermi="['system:post:captain']"
        >设置队长</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-user"
          size="mini"
          :disabled="single"
          @click="handleCaptain"
          v-hasPermi="['system:post:captain']"
        >重置密码</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-user"
          size="mini"
          :disabled="single"
          @click="handleCaptain"
          v-hasPermi="['system:post:captain']"
        >禁用账号</el-button>
      </el-col>
    </el-row> -->

    <el-table v-loading="loading" :data="postList" @selection-change="handleSelectionChange">
       <el-table-column type="selection" width="50" align="center" prop="driverId"  />
        <el-table-column label="编号" align="center" prop="driverName" />
        <el-table-column label="姓名" align="center" prop="driverSex" />
        <el-table-column label="手机号" align="center" prop="driverIdNumber" width="180"/>
        <el-table-column label="绑定车辆" align="center" prop="driverAge" />
        <el-table-column label="车辆级别" align="center" prop="driverAge" />
        <el-table-column label="车型" align="center" prop="remarks" width="120" :show-overflow-tooltip="true" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNumber"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改司机对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="司机姓名" prop="driverName">
          <el-input v-model="form.driverName" placeholder="请输入司机姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="driverSex">
          <el-radio-group v-model="form.driverSex">
            <el-radio
              v-for="dict in sex"
              :key="dict.key"
              :label="dict.key"
            >{{dict.val}}</el-radio>
          </el-radio-group>
        </el-form-item>
         <el-form-item label="证件号码" prop="driverIdNumber">
          <el-input v-model="form.driverIdNumber" placeholder="请输入司机证件号码" />
        </el-form-item>
        <el-form-item label="年龄" prop="driverAge">
          <el-input-number v-model="form.driverAge" controls-position="right" :min="0" />
        </el-form-item>
         <el-form-item label="联系地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入司机联系地址" />
        </el-form-item>
        <el-form-item label="联系电话" prop="driverPhoneNumber">
          <el-input v-model="form.driverPhoneNumber" placeholder="请输入司机电话" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入司机邮箱" />
        </el-form-item>
        <el-form-item label="司机类型" prop="driverType">
          <el-radio-group v-model="form.driverType">
            <el-radio
              v-for="dict in driverType"
              :key="dict.key"
              :label="dict.key"
            >{{dict.val}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="驾照类型" prop="postCode">
          <el-input v-model="form.postCode" placeholder="请输入司机电话" />
        </el-form-item>
        <el-form-item label="驾驶年限" prop="drivingYears">
          <el-input-number v-model="form.drivingYears" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="司机状态" prop="driverStatus">
          <el-radio-group v-model="form.driverStatus">
            <el-radio
              v-for="dict in driverStatus"
              :key="dict.key"
              :label="dict.key"
            >{{dict.val}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" type="textarea" placeholder="请输入内容" />
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
import { driverListPost, delDriver, addDriver, updateDriver, editStatus,trainsetList } from "@/api/normal/drivermanager";
import { getUrlKey } from '@/utils/index';
export default {
  name: "Post",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      selection:[],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 岗位表格数据
      postList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      driverStatus: [],
      sex: [],
      driverType: [],
      // 查询参数
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        invokeTarget: [
          { required: true, message: "调用目标字符串不能为空", trigger: "blur" }
        ],
        cronExpression: [
          { required: true, message: "cron执行表达式不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.sex = [{key:0,val:'男'},{key:1,val:'女'}];
    this.driverStatus = [{key:0,val:'启用'},{key:1,val:'禁用'}];
    this.driverType = [{key:0,val:'内部车辆'},{key:1,val:'外部车辆'}];
    // this.getDicts("sys_normal_disable").then(response => {
    //   this.statusOptions = response.data;
    // });
  },
  methods: {
    /** 查询岗位列表 */
    getList() {
      this.loading = true;
      trainsetList({id:getUrlKey("id",window.location.href)}).then(response => {
        this.postList = response.rows;
        this.total = response.total;

        this.loading = false;
      });
    },
    // 表单重置
    reset() {
      this.form = {
        driverId: undefined,
        driverName: undefined,
        driverSex: 0,
        driverAge: 30,
        driverIdNumber: 0,
        address: undefined,
        driverPhoneNumber: undefined,
        email: undefined,
        driverType: 0,
        drivingYears: 0,
        driverStatus: 0,
        remarks: undefined
      };
      this.resetForm("form");
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selection = selection;
      this.ids = selection.map(item => item.driverId);
      console.log(this.ids)
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加司机";
    },
    /** 修改按钮操作 */
    handleUpdate() {
      this.reset();
      this.form = this.selection[0];
      this.open = true;
      this.title = "修改岗位";
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.driverId != undefined) {
            delete this.form.createTime;
            delete this.form.updateTime;
            updateDriver(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addDriver(this.form).then(response => {
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
    /** 删除按钮操作 */
    handleDelete(row) {
      const driverIds = row.driverId || this.ids;
      this.$confirm('是否确认删除司机："' + driverIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          const ids = {
             "ids": driverIds.join(",")
           };
          return delDriver(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 设置队长 */
    handleCaptain(row) {
      const queryParams = this.queryParams;
      this.$confirm('您确认要禁用这名司机吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
        //   return editStatus(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
  }
};
</script>
