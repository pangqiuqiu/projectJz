<template>
  <div>
    <h3>我的自媒体</h3>
    <!-- tab切换 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="我的文章" name="first">
        <!-- 表格 -->
        <el-table :data="tableData1" border style="width: 100%" :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }" :cell-style="{ 'text-align': 'center' }">
          <el-table-column label="标题">
            <template slot-scope="scope">
              <span @click="details1(scope.row.id)">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="brand" label="品牌" width="180"></el-table-column>
          <el-table-column prop="postDate" label="时间" width="180"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit1(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete1(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          layout="prev, pager, next"
          hide-on-single-page
          @current-change="changePage1"
          :page-size="pageSize"
          :current-page="pageNo1"
          :total="total1">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="我的视频" name="second">
        <!-- 表格 -->
        <el-table :data="tableData2" border style="width: 100%" :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }" :cell-style="{ 'text-align': 'center' }">
          <el-table-column label="标题">
            <template slot-scope="scope">
              <span @click="details2(scope.row.id)">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="brand" label="品牌" width="180"></el-table-column>
          <el-table-column prop="postDate" label="时间" width="180"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit2(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete2(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          layout="prev, pager, next"
          hide-on-single-page
          @current-change="changePage2"
          :page-size="pageSize"
          :current-page="pageNo2"
          :total="total2">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data () {
    return {
      // 默认选中项
      activeName: 'first',
      userId: Cookie.get('ID'),
      // 表格
      tableData1: [],
      pageSize: 8,
      pageNo1: 1,
      total1: 0,
      tableData2: [],
      pageNo2: 1,
      total2: 0
    }
  },
  created () {
    // 获取我的文章
    this.getInfor()
    // 获取我的视频
    this.getVideo()
  },
  methods: {
    // 获取我的文章
    async getInfor () {
      const { data: res } = await this.$http.post('/user/myKeyNList', {
        pageSize: this.pageSize,
        pageNo: this.pageNo1,
        userId: this.userId,
        type: '重点号资讯'
      })
      this.tableData1 = res.l
      this.total1 = res.num
    },
    // 获取我的视频
    async getVideo () {
      const { data: res } = await this.$http.post('/user/myKeyNList', {
        pageSize: this.pageSize,
        pageNo: this.pageNo2,
        userId: this.userId,
        type: '重点号视频'
      })
      this.tableData2 = res.l
      this.total2 = res.num
    },
    // 切换分页
    changePage1 (index) {
      this.pageNo1 = index
      this.getInfor()
    },
    changePage2 (index) {
      this.pageNo2 = index
      this.getVideo()
    },
    // 编辑
    handleEdit1 (row) {
      this.$router.push({
        path: '/user/zhongedit',
        query: { id: row.id, type: 1 }
      })
    },
    handleEdit2 (row) {
      this.$router.push({
        path: '/user/zhongedit',
        query: { id: row.id, type: 2 }
      })
    },
    // 删除
    async handleDelete1 (row) {
      const res = await this.$http.post('/key/delKeyN', {
        userId: this.userId,
        id: row.id
      })
      if (res.data !== true || res.status !== 200) return this.$message.error('操作失败')
      this.$message.success('操作成功')
      this.getInfor()
    },
    async handleDelete2 (row) {
      const res = await this.$http.post('/key/delKeyN', {
        userId: this.userId,
        id: row.id
      })
      if (res.data !== true || res.status !== 200) return this.$message.error('操作失败')
      this.$message.success('操作成功')
      this.getVideo()
    },
    // 详情页面
    details1 (id) {
      const { href } = this.$router.resolve({
        path: '/media/details/infor',
        query: { id: id }
      })
      window.open(href, '_blank')
    },
    details2 (id) {
      const { href } = this.$router.resolve({
        path: '/media/details/video',
        query: { id: id }
      })
      window.open(href, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
  span {
    cursor: pointer;
  }
</style>
