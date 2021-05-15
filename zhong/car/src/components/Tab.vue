<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="询问底价" name="Tab1" class="tab1">
      <TabItem :btn="title1"></TabItem>
    </el-tab-pane>
    <el-tab-pane label="分期购车" name="Tab2" class="tab1">
      <TabItem :btn="title2"></TabItem>
    </el-tab-pane>
    <!-- <el-tab-pane label="定制进口车" name="Tab3" class="tab1 tab3">
      <h5>填写信息给商家</h5>
      <el-form :model="form" label-width="100px">
        <el-form-item label="定制车型" :inline="true">
          <el-select v-model="form.brand" placeholder="选择品牌" @visible-change="changeBrand($event)">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-select v-model="form.system" placeholder="选择车系" :disabled="disabledSystem" @visible-change="changeSystem($event)">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排量信息">
          <el-radio-group v-model="form.displacement">
            <el-radio-button label="大排量"></el-radio-button>
            <el-radio-button label="小排量"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="版本信息">
          <el-radio-group v-model="form.edition">
            <el-radio-button label="中东版"></el-radio-button>
            <el-radio-button label="美规版"></el-radio-button>
            <el-radio-button label="欧规版"></el-radio-button>
            <el-radio-button label="墨西哥版"></el-radio-button>
            <el-radio-button label="加规版"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="定制城市" :inline="true">
          <el-select v-model="form.province" placeholder="选择省份" @visible-change="changeProvince($event)">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-select v-model="form.city" placeholder="选择城市" :disabled="disabledCity" @visible-change="changeCity($event)">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特殊要求">
          <textarea v-model="form.desc" rows="10" cols="60" placeholder="请输入您的需求"></textarea>
        </el-form-item>
        <el-form-item label="您的姓名" prop="username">
          <el-input v-model="form.username" placeholder="请输入您的姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submiting">免费发布</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane> -->
    <el-tab-pane label="预约试驾" name="Tab4" class="tab1">
      <TabItem :btn="title3"></TabItem>
    </el-tab-pane>
    <el-tab-pane label="置换购车" name="Tab5" class="tab1">
      <TabItem :btn="title4"></TabItem>
    </el-tab-pane>
    <!-- <el-tab-pane label="优惠养车" name="Tab6"></el-tab-pane> -->
  </el-tabs>
</template>

<script>
import TabItem from '../components/TabItem.vue'
// 手机号正则
// let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
export default {
  components: {
    TabItem
  },
  data () {
    return {
      // 按钮文字
      title1: '获取底价',
      title2: '分期购车',
      title3: '预约试驾',
      title4: '置地换车',
      activeName: 'Tab1'
      // 3.定制进口车
      // form: {
      //   brand: '', // 品牌
      //   system: '', // 车系
      //   displacement: '大排量', // 排量
      //   edition: '中东版', // 版本
      //   province: '', // 省
      //   city: '', // 市
      //   desc: '', // 特殊要求
      //   username: '', // 姓名
      //   mobile: '' // 手机号
      // }
    }
  }
  // methods: {
  //   // 获取品牌信息
  //   changeBrand (callback) {
  //     if (callback === true) {
  //       console.log('品牌')
  //     }
  //   },
  //   // 获取车系信息
  //   changeSystem (callback) {
  //     if (callback === true) {
  //       console.log('车系')
  //     }
  //   },
  //   // 获取省份
  //   changeProvince (callback) {
  //     if (callback === true) {
  //       console.log('省份')
  //     }
  //   },
  //   // 获取城市
  //   changeCity (callback) {
  //     if (callback === true) {
  //       console.log('城市')
  //     }
  //   },
  //   // 提交表单
  //   submiting () {
  //     // 判断信息是否填写完毕
  //     if (this.form.brand === '' || this.form.system === '' || this.form.province === '' || this.form.city === '' || this.form.username === '' || this.form.mobile === '') {
  //       return this.$message.warning('请将信息填写完整')
  //     }
  //     // 判断手机号填写是否合法
  //     if (!phoneReg.test(this.form.mobile)) {
  //       return this.$message.warning('请填写正确的手机号')
  //     }
  //     console.log(this.form)
  //   }
  // },
  // computed: {
  //   // 判断车系下拉框
  //   disabledSystem () {
  //     if (this.form.brand !== '') {
  //       return false
  //     }
  //     return true
  //   },
  //   // 判断城市下拉框
  //   disabledCity () {
  //     if (this.form.province !== '') {
  //       return false
  //     }
  //     return true
  //   }
  // }
}
</script>

<style lang="less">
.el-tabs__item.is-active {
  color: #000;
}
// h5 {
//   color: #FF6B09;
//   margin-bottom: 20px;
// }
// .el-select {
//   width: 150px;
//   margin-right: 15px;
// }
// .el-input {
//   width: 300px;
// }
// .el-button {
//   width: 300px;
// }
// textarea {
//   resize: none;
// }
</style>
