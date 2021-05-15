<template>
  <div>
    <!-- 面包屑 -->
    <h3>分站资讯审核</h3>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
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
        <el-form-item label="城市">
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
        <el-form-item label="文章标题">
          <el-input style="width: 300px;" v-model="formInline.title" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 搜索结果 -->
    <template>
      <el-table
        :header-cell-style="{ 'text-align': 'center', 'font-size': '16px', 'color': '#000' }"
        :cell-style="{ 'text-align': 'center' }"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="120">
        </el-table-column>
        <el-table-column
          label="标题">
          <template slot-scope="scope">
            <span @click="title(scope.row.id)">{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="issueDate"
          label="发布日期"
          width="180">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleEdit(scope.row.id)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
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
      // 搜索条件
      formInline: {
        provinceId: '',
        cityId: '',
        title: '',
        pageNo: 1,
        pageSize: 20
      },
      // 总数
      total: 0,
      // 省份城市
      provinceAry: [],
      cityAry: [],
      // 表格
      tableData: []
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
      if (this.formInline.provinceId !== '') this.getCity()
    },
    // 获取资讯列表
    async getInformationList () {
      const { data: res } = await this.$http.post('/Infor/subHome', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 查询
    submit () {
      this.formInline.pageNo = 1
      this.getInformationList()
    },
    // 表格操作按钮
    handleEdit (id) { // 审核
      this.$router.push({
        path: '/information/details',
        query: { id: id }
      })
    },
    // 切换页数
    changePage (index) {
      this.formInline.pageNo = index
      this.getInformationList()
    },
    // 表格操作按钮
    title (id) { // 标题
      window.open(`https://zhongdianqiche.com/car/#/automotivelnformation/details?id=${id}`)
    },
  },
  created () {
    // 获取资讯列表
    this.getInformationList()
    // 省份
    this.getProvince()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 20px;
}
// 新建资讯
.addInformation {
  margin-bottom: 20px;
  border-radius: 10px;
}
span {
  cursor: pointer;
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
  text-align: center;
  margin-top: 20px;
}
</style>
