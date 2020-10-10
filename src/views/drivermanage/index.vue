<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
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
          icon="el-icon-circle-check"
          size="mini"
          :disabled="single"
          @click="handleAvailable"
          v-hasPermi="['system:post:available']"
        >启用</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          icon="el-icon-circle-close"
          size="mini"
          :disabled="single"
          @click="handleAvailable"
          v-hasPermi="['system:post:disabled']"
        >禁用</el-button>
      </el-col>
     <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-user"
          size="mini"
          :disabled="single"
          @click="handleCaptain"
          v-hasPermi="['system:post:hand']"
        >设置队长</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-user"
          size="mini"
          :disabled="single"
          @click="resetPassword"
          v-hasPermi="['system:post:edit']"
        >重置密码</el-button>
      </el-col>
      <el-col :span="1.5">
         <el-button
           type="warning"
           icon="el-icon-user"
           size="mini"
           :disabled="single"
           @click="accountCaptain"
           v-hasPermi="['system:post:captain']"
         >启用账号</el-button>
       </el-col>
     <el-col :span="1.5">
        <el-button
          type="info"
          icon="el-icon-user"
          size="mini"
          :disabled="single"
          @click="accountCaptain"
          v-hasPermi="['system:post:captain']"
        >禁用账号</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="postList" @selection-change="handleSelectionChange">
       <el-table-column type="selection" width="50" align="center" prop="driverId" />
        <el-table-column label="姓名" align="center" prop="driverName" />
        <el-table-column label="性别" align="center" prop="driverSex" :formatter="driverSexatter" />
        <el-table-column label="证件号码" align="center" prop="driverIdNumber" width="180"/>
        <el-table-column label="年龄" align="center" prop="driverAge" />
        <el-table-column label="联系地址" align="center" prop="address" width="180" />
        <el-table-column label="联系电话" align="center" prop="driverPhoneNumbe" width="180" />
        <el-table-column label="邮箱" align="center" prop="email" width="120" />
        <el-table-column label="司机类型" align="center" prop="driverType" :formatter="driverTypeatter" />
        <el-table-column label="驾照类型" align="center" prop="licenseType"  />
        <el-table-column label="驾驶年限" align="center" prop="drivingYears" />
        <el-table-column label="司机状态" align="center" prop="driverStatus" :formatter="driverStatusatter"  />
        <el-table-column label="账号状态" align="center" prop="accountStatus" :formatter="accountStatusatter"  />
        <el-table-column label="车组名称" align="center" prop="fleetName"  />
        <el-table-column label="备注" align="center" prop="remarks" width="120" :show-overflow-tooltip="true" />
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
        <el-form-item label="联系电话" prop="driverPhoneNumbe">
          <el-input v-model="form.driverPhoneNumbe" placeholder="请输入司机电话" />
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
        <el-form-item label="驾照类型" prop="licenseType">
        <el-select v-model="form.licenseType"
                   placeholder="请选择驾照类型">
          <el-option v-for="(item, index) in licenseType"
                     :key="index"
                     :label="item.label"
                     :value="item.value"
                     :disabled="item.disabled"></el-option>
        </el-select>
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
        <el-form-item label="车组" prop="trainsetId">
        <el-select v-model="form.trainsetId"
                   placeholder="请选择车组">
          <el-option v-for="(item, index) in carFleetList"
                     :key="index"
                     :label="item.fleetName"
                     :value="item.id"
                     :disabled="item.disabled"></el-option>
        </el-select>
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
    <!--重置密码 -->
    <el-dialog :title="resettitle" :visible.sync="resetopen" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" type="textarea" placeholder="请输入新密码" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetsForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { commSelect } from "../selectOption"
import { driverListPost, delDriver, addDriver, updateDriver, editStatus, getscCarFleetList,resetPassword,updateAccountStatus,editCaptain} from "@/api/normal/drivermanager";

export default {
  name: "Post",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      phones:'',
      trainsetId:[],
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
      resettitle:'',
      // 是否显示弹出层
      open: false,
      resetopen:false,
      // 状态数据字典
      driverStatus: [],
      sex: [],
      driverType: [],
      licenseType:'',
      // 查询参数
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
      },
     //车组
      carFleetList:'',
      // 下拉选项
      licenseType: commSelect.licenseTypeOptions,  //驾照类型
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        trainsetId: [
          { required: true, message: "车组不能为空", trigger: "blur" }
        ],
        cronExpression: [
          { required: true, message: "cron执行表达式不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getCar();
    this.getList();
    this.sex = [{key:0,val:'男'},{key:1,val:'女'}];
    this.driverStatus = [{key:0,val:'启用'},{key:1,val:'禁用'}];
    // this.licenseType = [{key:0,val:'A1'},{key:1,val:'A2'},{key:2,val:'B1'},{key:3,val:'B2'},{key:4,val:'C1'},{key:5,val:'C2'}];
    this.driverType = [{key:0,val:'内部车辆'},{key:1,val:'外部车辆'}];

    // this.getDicts("sys_normal_disable").then(response => {
    //   this.statusOptions = response.data;
    // });
  },
  methods: {
  /* 下拉车组id*/
    getCar(){
      const params = "";
      getscCarFleetList(params).then(response => {
        this.carFleetList = response;
      });
    },
    /** 查询司机列表 */
    getList() {
      this.loading = true;
      driverListPost(this.queryParams).then(response => {
        this.postList = response.rows;
        this.total = response.total;
        this.total = 1;
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
        driverPhoneNumbe: undefined,
        email: undefined,
        driverType: 0,
        drivingYears: 0,
        driverStatus: 0,
        licenseType:undefined,
        remarks: undefined,
        password:undefined,
        phone: this.phones
      };
      this.resetForm("form");
      /* this.form = {
        password:undefined,
        phone:undefined
      };
      this.resetForm("form"); */
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selection = selection;
      this.ids = selection.map(item => item.driverId);
      this.trainsetId = selection.map(item => item.trainsetId);
      this.phones = selection.map(item => item.driverPhoneNumbe);
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
    /* 重置密码*/
    resetPassword(){
      this.reset();
      this.resetopen = true;
      this.resettitle = "重置密码";
    },
    resetsForm:function(){
      // console.log(this.form.password)ids.join(",")
      resetPassword({phone:this.phones.join(","),password:this.form.password}).then(response => {
        console.log(response)
        if (response.code === 200) {
          this.msgSuccess("重置成功");
          this.resetopen = false;
          this.getList();
        }
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.driverId != undefined) {
            delete this.form.createTime;
            delete this.form.updateTime;
            updateDriver(this.form).then(response => {
              console.log(response)
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
             console.log(this.form)
            addDriver(this.form).then(response => {
              console.log(response)
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
           // const ids = driverIds.join(",");
          return delDriver(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /* 设置队长*/
    handleCaptain(row){

      console.log(row)
      const driverIds = row.driverId || this.ids;
      const trainsetId = this.trainsetId;
      this.$confirm('是否确认设置该司机为队长?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            const ids = {
               "driverId":parseInt(driverIds.join(",")),
               "trainsetId":parseInt(trainsetId.join(","))
             };
             console.log(ids)
             return editCaptain(ids);
          }).then(response => {
            console.log(1)
            this.getList();
            this.msgSuccess("设置队长成功");
          }).catch(function() {
          /* const ids = {
               "driverId": driverIds.join(","),
               "trainsetId":trainsetId.join(","),
             };
             console.log(ids)
             return editCaptain(ids); */
          });
    },

    /* 账号*/
    accountCaptain(row){
      const driverIds = row.driverId || this.ids;
      if(row.toElement.innerText == "启用账号"){
        this.$confirm('您确认要启用吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(function() {
                const data = {
                  driverId: parseInt(driverIds.join(",")),
                  accountStatus:0
                };
                return updateAccountStatus(data);
              }).then(response => {
                this.getList();
                this.msgSuccess("启用成功");
              }).catch(function() {});

      }else{
        this.$confirm('您确认要禁用吗?', "警告", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(function() {
              const data = {
                driverId:parseInt(driverIds.join(",")),
                accountStatus:1
              };
              return updateAccountStatus(data);
            }).then(response => {
              this.getList();
              this.msgSuccess("禁用成功");
            }).catch(function() {});
      }
    },
    /** 启用/禁用 */
    handleAvailable(row) {
      const driverIds = row.driverId || this.ids;
      if(row.toElement.innerText == "启用"){
        this.$confirm('您确认要启用这名司机吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(function() {
                const data = {
                  driverId: driverIds.join(","),
                  driverStatus:0
                };
                return editStatus(data);
              }).then(response => {
                this.getList();
                this.msgSuccess("启用成功");
              }).catch(function() {});

      }else{
        this.$confirm('您确认要禁用这名司机吗?', "警告", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(function() {
              const data = {
                driverId: driverIds.join(","),
                driverStatus:1
              };
              return editStatus(data);
            }).then(response => {
              this.getList();
              this.msgSuccess("禁用成功");
            }).catch(function() {});
      }
      },
      driverSexatter (row) {
        if (row.driverSex==="0") {
          return '男'
        } else if(row.driverSex==="1") {
          return '女'
        }
      },
      driverTypeatter (row) {
        if (row.driverType===0) {
          return '内部车辆'
        } else if(row.driverType===1) {
          return '外部车辆'
        }
      },
      driverStatusatter (row) {
        if (row.driverStatus===0) {
          return '启用'
        } else if(row.driverStatus===1) {
          return '禁用'
        }
      },
      accountStatusatter (row) {
        if (row.accountStatus===0) {
          return '启用'
        } else if(row.accountStatus===1) {
          return '禁用'
        }
      },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },

  }
};
</script>
