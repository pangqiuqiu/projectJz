<template>
  <div>
    <h3>经销商管理员</h3>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="省份">
          <el-select v-model="formInline.provinceId" placeholder="请选择省份" size="mini" @change="changeP">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.province" :value="item.provinceid" v-for="item in provinceAry" :key="item.provinceid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select :disabled="disabledCity" @visible-change="dropDownCity($event)" v-model="formInline.cityId" placeholder="请选择城市" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.city" :value="item.cityid" v-for="item in cityAry" :key="item.cityid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 列表区域 -->
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
        prop="name"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="dealer"
        label="公司">
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
        provinceId: '',
        cityId: '',
        pageNo: 1,
        pageSize: 20
      },
      // 总数
      total: 0,
      // 省份
      provinceAry: [],
      // 城市
      cityAry: [],
      // 表格
      tableData: []
    }
  },
  computed: {
    disabledCity () {
      if (this.formInline.provinceId === '') return true
      return false
    }
  },
  methods: {
    // 获取省份信息
    async getProvince () {
      const { data: res } = await this.$http.post('/area/getProvince', this.formInline)
      this.provinceAry = res
    },
    // 获取城市
    async dropDownCity (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/area/getCityByPid', {
          provinceId: this.formInline.provinceId
        })
        this.cityAry = res
      }
    },
    // 改变省份信息
    changeP () {
      this.formInline.cityId = ''
    },
    // 获取列表数据
    async getTable () {
      const { data: res } = await this.$http.post('/user/dealerUser', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 查询数据
    submit () {
      this.formInline.pageNo = 1
      this.getTable()
    },
    // 分页
    changePage (index) {
      this.formInline.pageNo = index
      this.getTable()
    }
  },
  created () {
    // 获取省份信息
    this.getProvince()
    // 获取列表数据
    this.getTable()
  }
}
</script>

<style scoped lang="less">
h3 {
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
