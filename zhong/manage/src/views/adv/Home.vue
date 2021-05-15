<template>
  <div>
    <h3>广告位</h3>
    <!-- 首页已有轮播图 -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column label="广告位置">
        <template slot-scope="scope">
          <span class="find" @click="viewPic(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="级别">
      </el-table-column>
      <el-table-column
        prop="size"
        label="尺寸">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看预览 -->
    <el-dialog :title="title" :visible.sync="dialogTableVisible" @close="close">
      <img :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表格
      tableData: [],
      // 弹框
      title: '',
      dialogTableVisible: false,
      // 图片地址
      imgUrl: ''
    }
  },
  methods: {
    // 获取广告列表
    async getAdv () {
      const { data: res } = await this.$http.post('/adv/advList')
      this.tableData = res
    },
    // 修改页面
    handleEdit (row) {
      if (row.type === '全国') {
        this.$router.push({
          path: '/adv/edit',
          query: { row: JSON.stringify(row) }
        })
      } else {
        this.$router.push({
          path: '/adv/list',
          query: { row: JSON.stringify(row) }
        })
      }
    },
    // 查看预览
    async viewPic (row) {
      // const { data: res } = await this.$http.post('', row)
      // this.imgUrl = res
      this.title = row.name
      this.dialogTableVisible = true
    },
    close () {
      this.imgUrl = ''
    }
  },
  created () {
    // 获取广告位
    this.getAdv()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 20px;
}
.el-input {
  width: 250px;
  margin-right: 20px;
}
.find:hover {
  cursor: pointer;
}
</style>
