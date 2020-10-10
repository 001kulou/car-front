<!-- 添加新订单 -->
<template>
  <div class='add-order'>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             size="small"
             label-width="180px"
             :inline="true">
      <!-- *****************   客户信息    ******************************** -->
      <div class="title">客户信息/Customer Information</div>
      <!-- 客户公司名称/Company Name -->
      <el-form-item label="客户公司名称/Company Name"
                    prop="companyName">
        <el-select v-model="form.companyName"
                   placeholder="请选择客户公司名称">
          <el-option v-for="(item, index) in addCompanyNameOptions"
                     :key="index"
                     :label="item.label"
                     :value="item.value"
                     :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <!-- 客户部门/Customer Department -->
      <el-form-item label="客户部门/Customer Department"
                    prop="customerDepartment">
        <el-select v-model="form.customerDepartment"
                   placeholder="请选择客户部门">
          <el-option v-for="(item, index) in addCustomerDepartmentOptions"
                     :key="index"
                     :label="item.label"
                     :value="item.value"
                     :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <!-- 客户职位/Customer Position -->
      <el-form-item label="客户职位/Customer Position"
                    prop="customerPosition">
        <el-select v-model="form.customerPosition"
                   placeholder="请选择客户职位">
          <el-option v-for="(item, index) in addCustomerPositiontOptions"
                     :key="index"
                     :label="item.label"
                     :value="item.value"
                     :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <!-- 联系人/Contacts -->
      <el-form-item label="联系人/Contacts"
                    prop="contacts">
        <el-select v-model="form.contacts"
                   placeholder="请选择联系人">
          <el-option v-for="(item, index) in addContactsOptions"
                     :key="index"
                     :label="item.label"
                     :value="item.value"
                     :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <!-- 联系电话/Contact Number -->
      <el-form-item label="联系电话/Contact Number"
                    prop="contactNumber">
        <el-input v-model="form.contactNumber"
                  placeholder="请输入内容"></el-input>
      </el-form-item>
      <!-- 联系邮箱/E-mail -->
      <el-form-item label="联系邮箱/E-mail"
                    prop="email">
        <el-input v-model="form.email"
                  placeholder="请输入内容"></el-input>
      </el-form-item>

      <!-- *****************  行程信息    ***************************** -->
      <div class="title">行程信息/Travel Information</div>
      <!-- 客人姓名/Guest Name -->
      <el-form-item label="客人姓名/Guest Name"
                    prop="guestName">
        <el-input v-model="form.guestName"
                  placeholder="请输入内容"></el-input>
      </el-form-item>
      <!-- 客人电话/Contact -->
      <el-form-item label="客人电话/Contact"
                    prop="guestNumber">
        <el-input v-model="form.guestNumber"
                  placeholder="请输入内容"></el-input>
      </el-form-item>
      <!--用车类型/Type -->
      <el-form-item label="用车类型/Type"
                    prop="vehicleType">
        <el-select v-model="form.vehicleType"
                   placeholder="请选择用车类型">
          <el-option v-for="(item, index) in addCarTypeOptions"
                     :key="index"
                     :label="item.label"
                     :value="item.value"
                     :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <!--客人级别/Guest Level -->
      <el-form-item label="客人级别/Guest Level"
                    prop="guestLeve">
        <el-select v-model="form.guestLeve"
                   placeholder="请选择客人级别">
          <el-option v-for="(item, index) in addGuestLevelOptions"
                     :key="index"
                     :label="item.label"
                     :value="item.value"
                     :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <!-- 出发时间/Initial Time -->
      <el-form-item label="出发时间/Initial Time"
                    prop="departureTime">
        <el-input v-model="form.departureTime"
                  placeholder="请输入内容"></el-input>
      </el-form-item>
      <!--出发地点/Place of Departure -->
      <el-form-item label="出发地点/Place of Departure"
                    prop="placeDeparture">
        <el-input v-model="form.placeDeparture"
                  placeholder="请输入内容"></el-input>
      </el-form-item>
      <!--到达地点/Location of Arriva -->
      <el-form-item label="到达地点/Location of Arriva"
                    prop="arrivalPlace">
        <el-input v-model="form.arrivalPlace"
                  placeholder="请输入内容"></el-input>
      </el-form-item>
      <!-- *****************  派单信息    ***************************** -->
      <!-- *车辆选择/Car Select -->
      <div class="title">派单信息/Distribute leaflets Information</div>
      <el-form-item label="车辆选择/Car Select"
                    prop="carStatus">
        <el-input v-model="form.carStatus"
                  placeholder="请输入内容"  readonly></el-input>
        <el-button type="primary"
                 @click="carSelect">选择</el-button>
      </el-form-item>
      <!-- 车辆级别/Car Level -->
      <el-form-item label="车辆级别/Car Level"
                    prop="carLevel">
       <el-input v-model="form.carLevel"
                              placeholder="请输入内容" readonly></el-input>
       <!-- <el-select v-model="form.carLevel"
                   placeholder="请选择车辆级别">
          <el-option v-for="(item, index) in addCarLevelOptions"
                     :key="index"
                     :label="item.label"
                     :value="item.value"
                     :disabled="item.disabled"></el-option>
        </el-select> -->
      </el-form-item>
      <!-- 车辆品牌/Vehicle Brand -->
      <el-form-item label="车辆品牌/Vehicle Brand"
                    prop="vehicleBrand">
        <el-input v-model="form.vehicleBrand"
                  placeholder="请输入内容" readonly></el-input>
      </el-form-item>
      <!--车辆类型/Car Type -->
      <el-form-item label="车辆类型/Car Type"
                    prop="carType">
        <el-input v-model="form.carType"
                  placeholder="请输入内容" readonly></el-input>
      </el-form-item>
      <!-- 价格/Price -->
      <el-form-item label="价格/Price"
                  prop="price">
        <el-input v-model="form.price"
                  placeholder="请输入内容"></el-input>
      </el-form-item>
      <!--车组/Car Group -->
      <el-form-item label="车组/Car Group"
                    prop="carGroup">
                    <el-input v-model="form.carGroup"
                              placeholder="请输入内容" readonly></el-input>
       <!-- <el-select v-model="form.carGroup"
                   placeholder="请选择车组">
          <el-option v-for="(item, index) in addCarGroupOptions"
                     :key="index"
                     :label="item.label"
                     :value="item.value"
                     :disabled="item.disabled"></el-option>
        </el-select> -->
      </el-form-item>
      <!--折扣比例/Discount Proportion -->
      <el-form-item label="折扣比例/Discount Proportion"
                    prop="discountProportion">
        <el-select v-model="form.discountProportion"
                   placeholder="请选择折扣比例">
          <el-option v-for="(item, index) in addDiscountProportionOptions"
                     :key="index"
                     :label="item.label"
                     :value="item.value"
                     :disabled="item.disabled"></el-option>
        </el-select>
      </el-form-item>
      <!--司机/Driver -->
      <el-form-item label="司机/Driver"
                    prop="driverName">
         <el-input v-model="form.driverName"
                   placeholder="请输入内容"  readonly></el-input>
        <!-- <el-select v-model="form.driverName"
                   placeholder="请选择司机">
          <el-option v-for="(item, index) in addGriverOptions"
                     :key="index"
                     :label="item.label"
                     :value="item.value"
                     :disabled="item.disabled"></el-option>
        </el-select> -->
      </el-form-item>
      <!-- 司机联系电话/Driver Contact Number -->
      <el-form-item label="司机联系电话/Driver Contact Number"
                  prop="driverPhoneNumbe">
        <el-input v-model="form.driverPhoneNumbe"
                  placeholder="请输入内容"  readonly></el-input>
      </el-form-item>

      <!-- *****************  其他信息    ***************************** -->
      <div class="title">其他信息/Other Info</div>
      <!-- 备注 -->
      <el-form-item label="备注"
                    prop="remarks">
        <el-input v-model="form.remarks"
                  type="textarea"
                  placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button type="primary"
                 @click="resetForm">重 置</el-button>
      <el-button type="primary"
                 @click="submitForm">保 存</el-button>
      <el-button @click="cancel">返 回</el-button>
    </div>
  </div>
</template>

<script>
import { addDriver } from "@/api/normal/ordermanage";
import { commSelect } from "../selectOption"
export default {
  components: {},
  //props:  {type: Number或[Number, String], default: 0, required: true}
  props: {},
  data () {
    return {
      // 下拉选项
      addCompanyNameOptions: commSelect.addCompanyNameOptions,  //客户公司名称
      addCustomerDepartmentOptions: commSelect.addCustomerDepartmentOptions,  //客户部门
      addCustomerPositiontOptions: commSelect.addCustomerPositiontOptions,  //客户职位
      addContactsOptions: commSelect.addContactsOptions,  //联系人
      addCarTypeOptions: commSelect.addCarTypeOptions,  //用车类型
      addGuestLevelOptions: commSelect.addGuestLevelOptions,  //客人级别
      addCarLevelOptions: commSelect.addCarLevelOptions,  //车辆级别
      addCarOptions: commSelect.addCarOptions,  //车辆类型
      addCarGroupOptions: commSelect.addCarGroupOptions,  //车组
      addDiscountProportionOptions: commSelect.addDiscountProportionOptions, //折扣比例
      addGriverOptions: commSelect.addGriverOptions,  //司机


      // 表单参数
      form: {
        carId:this.$route.query.id,
        carLevel:this.$route.query.carLevel,
        vehicleBrand:this.$route.query.vehicleBrand,
        carStatus:this.$route.query.carSelect,
        carType:this.$route.query.carType,
        driverId:this.$route.query.driverId,
        carGroup:this.$route.query.fleetName,
        driverName:this.$route.query.driverName,
        driverPhoneNumbe:this.$route.query.driverPhoneNumbe,
      },
      // 表单校验
      rules: {}
    };
  },
  methods: {
    carSelect () {
      this.$router.push({
        path: '/orderoption/carselect'
      })
    },
    resetForm () {
      location. reload()
    },
    submitForm () {
      console.log(this.form)
      addDriver(this.form).then(response => {
        if (response.code === 200) {
          this.msgSuccess("新增成功");
          this.$router.push({
            path: '/orderoption/list'
          })
          // this.$router.go(-1);
         /* this.open = false;
          this.getList(); */
        }
      });
    },
    cancel () {

    }
  },
  computed: {},
  watch: {},
  created () {

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
.add-order {
  padding: 20px;
  .title {
    margin-bottom: 16px;
    font-size: 18px;
  }
}
</style>
