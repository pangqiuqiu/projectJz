<template>
  <el-container>
    <el-header>
      <!-- logo -->
      <div><img src="../../assets/logo.png" alt=""></div>
      <!-- 注册 -->
      <h2>欢迎入驻</h2>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>公司名称</label>
          <el-input v-model="formLabelAlign.name4s" placeholder="请输入公司名称"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>公司所在城市</label>
          <el-select @visible-change="dropDownProvince($event)" v-model="formLabelAlign.provinceid" placeholder="请选择省份" @change="changeP">
            <el-option :label="item.province" :value="item.provinceid" v-for="item in provinceAry" :key="item.provinceid"></el-option>
          </el-select>
          <el-select :disabled="isDisabledCity" @visible-change="dropDownCity($event)" v-model="formLabelAlign.city" placeholder="请选择城市">
            <el-option :label="item.city" :value="item.city" v-for="item in cityAry" :key="item.cityid"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>公司地址</label>
          <el-input v-model="formLabelAlign.companyAddress" placeholder="请输入公司地址"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>门店地址</label>
          <el-input v-model="formLabelAlign.address" placeholder="请输入门店详细地址" @blur="blurInput"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div id="allmap"></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>所属品牌</label>
          <el-select filterable @visible-change="dropDownBrand($event)" multiple v-model="formLabelAlign.brand" placeholder="请选择品牌">
            <el-option v-for="(item,index) in brandAry" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label></label>
          <el-button type="primary" style="margin: 100px 0; width: 400px" @click="submit" :disabled="isDisabledForm">提交</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 表单
      formLabelAlign: {
        name4s: '',
        provinceid: '',
        city: '',
        address: '',
        companyAddress: '',
        brand: [],
        token: '',
        lat: '', // 经度
        lng: '' // 纬度
      },
      lat: '', // 经度
      lng: '', // 纬度
      // 初始百度地址
      address: '',
      // 省份城市品牌
      provinceAry: [],
      cityAry: [],
      brandAry: []
    }
  },
  computed: {
    // 判断城市下拉框
    isDisabledCity () {
      if (this.formLabelAlign.provinceid !== '') {
        return false
      }
      return true
    },
    // 提交按钮
    isDisabledForm () {
      if (this.formLabelAlign.name4s.trim() !== '' && this.formLabelAlign.provinceid !== '' && this.formLabelAlign.city !== '' && this.formLabelAlign.address.trim() !== '' && this.formLabelAlign.companyAddress.trim() !== '' && this.formLabelAlign.brand.length !== 0) {
        return false
      }
      return true
    }
  },
  mounted () {
    this.$nextTick(function() {
      this.baiduMap()
    })
  },
  methods: {
    // 百度地图组件
    baiduMap () {
      const that = this
      // 百度地图API功能
      var map = new BMap.Map('allmap')
      var point = new BMap.Point(116.331398, 39.897445)
      map.centerAndZoom(point, 18)
      // 添加鼠标滚动缩放
      map.enableScrollWheelZoom()
      // 创建地址解析器实例
      var myGeo = new BMap.Geocoder()
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint(this.formLabelAlign.address, function (point) {
        if (point) {
          map.centerAndZoom(point, 16)
          map.addOverlay(new BMap.Marker(point))
          that.formLabelAlign.lat = point.lat
          that.formLabelAlign.lng = point.lng
        } else {
          alert('您选择地址没有解析到结果!')
        }
      }, '安徽省')
      this.address = this.formLabelAlign.address
    },
    // 数去焦点时判断
    blurInput () {
      if (this.formLabelAlign.address !== this.address) {
        this.baiduMap()
      }
    },
    // 获取省份
    async dropDownProvince (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/area/getProvince')
        this.provinceAry = res
      }
    },
    changeP () {
      this.formLabelAlign.city = ''
    },
    // 获取城市
    async dropDownCity (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/area/getCityByPid', {
          provinceId: this.formLabelAlign.provinceid
        })
        this.cityAry = res
      }
    },
    // 获取品牌
    async dropDownBrand (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/dealer/getDealerBrand')
        this.brandAry = res
        // console.log(res)
      }
    },
    // 提交表单
    async submit () {
      const token = this.$route.query.id
      this.formLabelAlign.token = token
      const res = await this.$http.post('/dealer/addDealer', this.formLabelAlign)
      if (res.data === '') {
        return
      }
      this.$router.push({
        path: '/all',
        query: { id: res.data }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: flex-start;
  padding: 0 100px;
  background-color: #f6f6f6;
  height: 100px!important;
  line-height: 100px;
  img {
    width: 50px;
    height: 50px;
    vertical-align: middle;
    margin-right: 40px;
  }
}
.el-main {
  margin-top: 40px;
  .el-row {
    margin-bottom: 20px;
  }
  label {
    display: inline-block;
    width: 130px;
  }
  .el-input {
    width: 420px;
  }
  .el-select {
    width: 200px;
    margin-right: 20px;
  }
  // 百度地址
  #allmap {
    height: 400px;
  }
}
</style>
