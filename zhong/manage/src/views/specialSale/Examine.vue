<template>
  <div>
    <!-- 面包屑 -->
    <h2>推广审核</h2>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="品牌">
          <el-select @change="changeBrand" v-model="formInline.brand" placeholder="请选择品牌" @visible-change="dropDownBrand($event)" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option v-for="item in brandAry" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车系">
          <el-select :disabled="disabledSeries" v-model="formInline.series" placeholder="请选择车系" @visible-change="dropDownSeries($event)" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option v-for="(item,index) in seriesAry" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 搜索结果 -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '14px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="specialSale.dealer"
        label="发布经销商"
        width="300">
      </el-table-column>
      <el-table-column
        prop="specialSale.brand"
        label="品牌"
        width>
      </el-table-column>
      <el-table-column
        prop="series"
        label="车系"
        width>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.row)">审核</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="changePage"
      hide-on-single-page
      :current-page="this.formInline.pageNo"
      :page-size="this.formInline.pageSize"
      background
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 搜索条件
      formInline: {
        brand: '',
        series: '',
        token: window.sessionStorage.getItem('token'),
        pageNo: 1,
        pageSize: 10
      },
      // 总数
      total: 0,
      // 品牌
      brandAry: [],
      // 车系
      seriesAry: [],
      // 表格
      tableData: []
    }
  },
  methods: {
    // 获取特卖列表
    async getSpecialSale () {
      const { data: res } = await this.$http.post('/sale/getTg', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 获取品牌
    async dropDownBrand (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/sale/showSaleBrand')
        this.brandAry = res
      }
    },
    changeBrand () {
      this.formInline.series = ''
    },
    // 获取车系
    async dropDownSeries (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/sale/showSaleSeries', {
          brand: this.formInline.brand
        })
        this.seriesAry = res
      }
    },
    // 查询
    submit () {
      this.formInline.pageNo = 1
      this.getSpecialSale()
    },
    // 表格操作按钮
    async handleEdit (row) { // 上首页
      if (row.home === 0) {
        const res = await this.$http.post('/sale/updateHome', {
          home: 1,
          id: row.id
        })
        if (res.status !== 200 || res.data !== true) {
          return
        }
        this.$message.success('上首页成功')
        this.submit()
      } else {
        const res = await this.$http.post('/sale/updateHome', {
          home: 0,
          id: row.id
        })
        if (res.status !== 200 || res.data !== true) {
          return
        }
        this.$message.success('下首页成功')
        this.submit()
      }
    },
    async handleDelete (row) { // 删除
      const res = await this.$http.post('/sale/delTg', {
        id: row.id
      })
      if (res.status === 200 && res.data === true) {
        this.$message.success('删除成功')
        this.submit()
      } else {
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      }
    },
    // 改变分页
    changePage (index) {
      this.formInline.pageNo = index
      this.getSpecialSale()
    }
  },
  computed: {
    // 判断车系下拉框
    disabledSeries () {
      if (this.formInline.brand !== '') {
        return false
      }
      return true
    }
  },
  created () {
    // 获取特卖列表
    this.getSpecialSale()
  }
}
</script>

<style lang="less" scoped>
h2 {
  margin-bottom: 20px;
}
// 搜索卡片区域
.el-card {
  margin-bottom: 15px;
  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
  .el-button {
    width: 150px;
  }
}
// 分页
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
