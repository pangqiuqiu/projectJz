<template>
  <div>
    <!-- 面包屑 -->
    <h3>用户管理</h3>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="省份">
          <el-select @visible-change="dropDownProvince($event)" v-model="formInline.provinceId" placeholder="请选择省份" size="mini" @change="changeP">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.province" :value="item.provinceid" v-for="item in provinceAry" :key="item.provinceid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select :disabled="disabledCity" @visible-change="dropDownCity($event)" v-model="formInline.city" placeholder="请选择城市" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.city" :value="item.city" v-for="item in cityAry" :key="item.cityId"></el-option>
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
        width="120">
      </el-table-column>
      <el-table-column
        prop="nikename"
        label="昵称"
        width="240">
      </el-table-column>
      <el-table-column
        prop="name"
        label="真实姓名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="100">
      </el-table-column>
      <el-table-column
        prop="area"
        label="城市">
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
        city: '',
        token: window.sessionStorage.getItem('token'),
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
  methods: {
    // 获取用户列表
    async getUserList () {
      const { data: res } = await this.$http.post('/user/showUser0', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 获取省份
    async dropDownProvince (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/area/getProvince')
        this.provinceAry = res
      }
    },
    changeP () {
      this.formInline.city = ''
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
    // 查询
    submit () {
      this.formInline.pageNo = 1
      this.getUserList()
    },
    // 切换页数
    changePage (index) {
      this.formInline.pageNo = index
      this.getUserList()
    }
  },
  computed: {
    // 判断城市下拉框
    disabledCity () {
      if (this.formInline.provinceId !== '') {
        return false
      }
      return true
    }
  },
  created () {
    // 获取用户列表
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
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
