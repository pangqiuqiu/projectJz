<template>
  <div>
    <h3>发布新车</h3>
    <ul>
      <li>
        <h4>选择品牌</h4>
        <el-select v-model="formAlign.brand" placeholder="请选择" filterable size="mini" style="width: 400px" @change="change">
          <el-option v-for="item in brandList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </li>
      <div class="h"></div>
      <li>
        <h4>选择车系</h4>
        <el-select v-model="formAlign.series" placeholder="请选择" filterable size="mini" style="width: 400px" @visible-change="visible($event)">
          <el-option v-for="item in seriesList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </li>
      <div class="h"></div>
      <li>
        <h4>选择时间</h4>
        <el-date-picker v-model="formAlign.months" type="month" placeholder="选择月" size="mini" style="width: 400px"></el-date-picker>
      </li>
      <div class="h"></div>
      <li>
        <h4>选择类型</h4>
        <el-select v-model="formAlign.label" placeholder="请选择" size="mini" style="width: 400px">
          <el-option label="新加车型" value="新加车型"></el-option>
          <el-option label="全新车系" value="全新车系"></el-option>
          <el-option label="车系换代" value="车系换代"></el-option>
          <el-option label="小改款" value="小改款"></el-option>
          <el-option label="中期改款" value="中期改款"></el-option>
        </el-select>
      </li>
      <div class="h"></div>
    </ul>
    <el-button :disabled="disabled" type="primary" @click="add" style="width: 300px; margin-left: 50px">确认发布</el-button>
  </div>
</template>

<script>
import { dateConversionMonth } from '../../assets/js/timer.js'
export default {
  data () {
    return {
      // 品牌
      brandList: [],
      // 车系
      seriesList: [],
      // 数据
      formAlign: {
        brand: '',
        series: '',
        months: '',
        label: ''
      }
    }
  },
  computed: {
    disabled () {
      if (this.formAlign.brand && this.formAlign.series && this.formAlign.months && this.formAlign.label) return false
      return true
    }
  },
  methods: {
    // 获取品牌
    async getBrand () {
      const { data: res } = await this.$http.post('/car/showAllBrand')
      this.brandList = res
    },
    // 获取车系
    async visible (callback) {
      if (callback) {
        const { data: res } = await this.$http.post('/car/showSeries', {
          brand: this.formAlign.brand
        })
        this.seriesList = res
      }
    },
    // 改变品牌
    change () {
      this.formAlign.series = ''
    },
    // 发布
    async add () {
      this.formAlign.months = dateConversionMonth(this.formAlign.months)
      const res = await this.$http.post('/rank/addNewCar', this.formAlign)
      if (res.data !== true || res.status !== 200) return this.$message.error('发布失败')
      this.$message.success('发布成功')
      for(let k in this.formAlign) {
        this.formAlign[k] = ''
      }
    }
  },
  created () {
    this.getBrand()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 20px;
}
ul {
  li {
    display: flex;
    justify-content: flex-start;
    h4 {
      font-weight: normal;
      margin-right: 40px;
    }
  }
  .h {
    height: 30px;
  }
}
</style>
