<template>
  <div>
    <!-- 头部标题 -->
    <div class="HeadTitle">
      <h2>新增特卖</h2>
      <el-button type="text" @click="back">《《 返回</el-button>
    </div>
    <!-- 注意事项 -->
    <div class="notice">注：每次只发布一个品牌特卖系列 (开始时间为00:00:00,结束时间为24:00:00)</div>
    <!-- 新增特卖表单 -->
    <el-form label-position="right" label-width="80px" :model="form" ref="rulesForm">
      <el-form-item label="品牌">
        <el-select v-model="brand" placeholder="请选择特卖品牌">
          <el-option v-for="item in brandAry" :key="item" :label="item" :value="item" @change="changeBrand"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="系列" v-show="this.brand !== ''">
        <el-checkbox-group v-model="form.series">
          <el-checkbox v-for="(item,index) in seriesAry" :key="index" :label="item"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item label="特卖时间" class="time">
        <div class="block">
          <el-date-picker
            v-model="form.activityDateS"
            type="date"
            placeholder="选择开始日期">
          </el-date-picker>
        </div>
        <div class="block">
          <el-date-picker
            v-model="form.activityDateE"
            type="date"
            placeholder="选择结束日期">
          </el-date-picker>
        </div>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submit('rulesForm')">确认发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 品牌
      brandAry: [],
      // 系列
      seriesAry: [],
      // 表单数据
      form: {
        brand: '',
        token: window.sessionStorage.getItem('token'),
        series: [], // 系列
        //activityDateS: '', // 开始时间
        //activityDateE: '' // 结束时间
      },
      brand: '' // 品牌
    }
  },
  watch: {
    brand (newVal) {
      this.getSeries()
    }
  },
  methods: {
    // 返回上一页面
    back () {
      this.$router.go(-1)
    },
    // 获取品牌
    async getBrand () {
      const { data: res } = await this.$http.post('/sale/showAddSaleBrand', {
        token: window.sessionStorage.getItem('token')
      })
      this.brandAry = res
    },
    // 改变品牌时
    changeBrand () {
      this.getSeries()
    },
    // 获取系列
    async getSeries () {
      const{ data: res } = await this.$http.post('/sale/showSaleSeries', {
        brand: this.brand
      })
      this.seriesAry = res
    },
    // 事件处理函数
    // dateConversion (value) {
    //   function checkTime (i) {
    //     if (i < 10) {
    //       i = '0' + i
    //     }
    //     return i
    //   }
    //   var d = new Date(value)
    //   var date = d.getFullYear() + '-' + checkTime(d.getMonth() + 1) + '-' + checkTime(d.getDate())
    //   return date
    // },
    // 提交特卖
    async submit () {
      this.form.brand = this.brand
      //this.form.activityDateS = this.dateConversion(this.form.activityDateS)
      //this.form.activityDateE = this.dateConversion(this.form.activityDateE)
      if (this.form.brand === '' || this.form.series.length === 0 ) {
        return this.$message.error('请将信息填写完整')
      }
      // 获取当前时间
      // const myDate = new Date()
      // const now = this.dateConversion(myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate())
      // if (this.form.activityDateS > this.form.activityDateE || this.form.activityDateS === this.form.activityDateE || this.form.activityDateS < now || this.form.activityDateS === now) {
      //   return this.$message.error('请填写正确的特卖时间')
      // }
      const res = await this.$http.post('/sale/addSale', this.form)
      if (res.data !== true || res.status !== 200) {
        return this.$message.error('新增失败')
      }
      this.$router.push('/specialSale/list')
      this.$message.success('新增成功')
    }
  },
  created () {
    // 获取品牌
    this.getBrand()
  }
}
</script>

<style lang="less" scoped>
// 头部标题
.HeadTitle {
  display: flex;
  justify-content: space-between;
  background-color: #f7f8f9;
  padding-left: 30px;
  height: 50px;
  line-height: 50px;
}
// 注意
.notice {
  color: red;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
}
// 新增表单
.el-form {
  margin-top: 30px;
  .el-form-item {
    margin-bottom: 20px;
  }
  .el-button {
    margin-top: 20px;
    width: 300px;
  }
  .time {
    overflow: hidden;
    .block {
      float: left;
      margin-right: 20px;
    }
  }
}
</style>
