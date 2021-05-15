<template>
  <div>
    <h3>首页图片展示</h3>
    <!-- 上传轮播图 -->
    <el-button size="small" @click="addPhoto" type="primary" style="margin-bottom: 10px">新增图片</el-button>
    <!-- 搜素条件 -->
    <el-card body-style="padding: 10px">
      <el-form style="height: 50px" :inline="true" :model="formInline">
        <el-form-item label="标题">
          <el-input placeholder="请输入标题" v-model="formInline.title" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="车系">
          <el-select v-model="formInline.series" placeholder="请选择车系" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item" :value="item" v-for="(item,index) in seriesAry" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="位置">
          <el-select v-model="formInline.type" placeholder="请选择位置" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option label="图片1" value="图片1"></el-option>
            <el-option label="图片2-7" value="图片2-7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100px" size="mini" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 首页图片 -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="series"
        width="150"
        label="车系">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="type"
        width="100"
        label="位置">
      </el-table-column>
      <el-table-column
        width="540"
        label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.pic" alt="">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
      // 搜索条件
      formInline: {
        pageSize: 10,
        pageNo: 1,
        title: '',
        series: '',
        type: ''
      },
      // 车系
      seriesAry: [],
      // 表格
      tableData: [],
      total: 0
    }
  },
  methods: {
    // 新增图片
    addPhoto () {
      this.$router.push('/pic/add')
    },
    // 获取图片信息
    async getSwiper () {
      const { data: res } = await this.$http.post('/pic/hotSeries', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 搜索
    onSubmit () {
      this.formInline.pageNo = 1
      this.getSwiper()
    },
    // 删除表格
    async handleDelete (row) {
      const res = await this.$http.post('/pic/delHot', {
        id: row.id
      })
      if (res.data !== true || res.status !== 200) {
        return this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.getSwiper()
    },
    // 改变分页
    changePage (index) {
      this.formInline.pageNo = index
      this.getSwiper()
    },
    // 获取品牌车系
    async getSeries () {
      const { data: res } = await this.$http.post('/pic/getSeries')
      this.seriesAry = res
    }
  },
  created () {
    // 获取图片
    this.getSwiper()
    // 获取车系
    this.getSeries()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 20px;
}

.el-table {
  margin-top: 15px;
}

.el-pagination {
  margin-top: 20px;
  text-align: center;
}

img {
  width: 500px;
  height: 300px;
}
</style>
