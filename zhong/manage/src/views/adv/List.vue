<template>
  <div>
    <!-- 广告位 -->
    <h3>{{row.name}}</h3>
    <!-- 搜索条件 -->
    <el-card v-if="row.type === '市' || row.type === '省'">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="省份">
          <el-select filterable v-model="formInline.provinceId" placeholder="请选择" size="mini" @change="changeProvince">
            <el-option label="不限" value=""></el-option>
            <el-option
              v-for="item in provinceAry"
              :key="item.provinceid"
              :label="item.province"
              :value="item.provinceid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" v-if="row.type === '市'">
          <el-select filterable v-model="formInline.cityId" size="mini" placeholder="请选择" :disabled="disabled">
            <el-option label="不限" value=""></el-option>
            <el-option
              v-for="item in cityAry"
              :key="item.cityid"
              :label="item.city"
              :value="item.cityid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- table -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="area"
        label="地区"
        width="110">
      </el-table-column>
      <el-table-column label="广告内容">
        <template slot-scope="scope">
          <img :src="scope.row.pic" alt="">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="changePage"
      hide-on-single-page
      :current-page="formInline.pageNo"
      :page-size="formInline.pageSize"
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
      // 路由参数
      row: {},
      // 搜索条件
      formInline: {
        provinceId: '',
        cityId: '',
        pageSize: 10,
        pageNo: 1,
        name: ''
      },
      provinceAry: [],
      cityAry: [],
      // 表格
      tableData: [],
      total: 0
    }
  },
  computed: {
    // 判断市区下拉框状态
    disabled () {
      if (this.formInline.provinceId === '') return true
      return false
    }
  },
  methods: {
    // 省份
    async getProvince () {
      const { data: res } = await this.$http.post('/area/getProvince')
      this.provinceAry = res
    },
    // 城市
    async getCity () {
      const { data: res } = await this.$http.post('/area/getCityByPid', {
        provinceId: this.formInline.provinceId
      })
      this.cityAry = res
    },
    // 改变省份下拉框
    changeProvince () {
      this.formInline.cityId = ''
      this.getCity()
    },
    // 获取表格数据
    async getTable () {
      const row = JSON.parse(this.$route.query.row)
      this.row = row
      this.formInline.name = row.name
      const { data: res } = await this.$http.post('/adv/advList2', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 分页
    changePage (index) {
      this.formInline.pageNo = index
      this.getTable()
    },
    // 搜索
    submit () {
      this.formInline.pageNo = 1
      this.getTable()
    },
    // 详情页
    handleEdit(row) {
      this.$router.push({
        path: '/adv/edit',
        query: { row: JSON.stringify(row) }
      })
    }
  },
  created () {
    // 获取表格数据
    this.getTable()
    // 省份
    this.getProvince()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 15px;
}
// 搜索卡片区域
.el-card {
  margin-bottom: 15px;
  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
}
// 分页
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
