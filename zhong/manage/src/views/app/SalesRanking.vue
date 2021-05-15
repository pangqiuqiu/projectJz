<template>
  <div>
    <h3>销量排行</h3>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="品牌">
        <template slot-scope="scope">
          <el-select filterable v-model="scope.row.brand" placeholder="请选择品牌" @change="change(scope.$index)">
            <el-option v-for="item in brandList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="车系">
        <template slot-scope="scope">
          <el-select v-model="scope.row.series" placeholder="请选择车系" @visible-change="getSeries($event, scope.row.brand, scope.$index)">
            <el-option v-for="item in scope.row.seriesList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="销量(辆)">
        <template slot-scope="scope">
          <el-input v-model="scope.row.saleNum" placeholder="请输入销量"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <!-- 按钮 -->
    <el-button type="primary" @click="handle">确定</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表格数据
      tableData: [],
      // 品牌列表
      brandList: [],
      // 车系
      seriesList: []
    }
  },
  methods: {
    // 获取表格数据
    async getTableList () {
      const { data: res } = await this.$http.post('/rank/showSaleRank')
      const num = 20 - res.length
      let fillArray = Array.from({length: num}, () => ({'brand': '', 'series': '', 'saleNum': '', 'seriesList': []}))
      this.tableData = [...res, ...fillArray]
    },
    // 获取品牌
    async getBrand () {
      const { data: res } = await this.$http.post('/car/showAllBrand')
      this.brandList = res
    },
    // 获取车系
    async getSeries (callback, brand, index) {
      if (callback) {
        const { data: res } = await this.$http.post('/car/showSeries', { brand: brand ? brand : '' })
        // this.tableData[index].seriesList = res
        // this.$forceUpdate()
        this.$set(this.tableData, index, { brand, seriesList: res })
      }
    },
    // 改变品牌
    async change (index) {
      this.tableData[index].series = ''
    },
    // 提交数据
    async handle () {
      const { data: res } = await this.$http.post('/rank/addSaleRank', {
        list: this.tableData
      })
      if(res === true) {
        this.getTableList()
        this.$message.success('修改成功')
      }
    }
  },
  created () {
    // 获取表格数据
    this.getTableList()
    // 获取品牌
    this.getBrand()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 15px;
}
.el-button {
  margin: 20px 10% 20px 10%;
  display: block;
  width: 80%;
}
</style>
