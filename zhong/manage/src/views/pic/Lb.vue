<template>
  <div>
    <h3>图片首页轮播图</h3>
    <!-- 上传轮播图 -->
    <el-button size="small" @click="addSwiper" type="primary" style="margin-bottom: 20px">上传轮播图</el-button>
    <!-- 对话框 -->
    <el-dialog title="新增轮播图" :visible.sync="dialogTableVisible" style="height: 500px">
      <div class="block">
        <el-cascader
          placeholder="请选择品牌车系"
          filterable
          style="width: 300px"
          :props="{ value: 'label', label: 'label'}"
          v-model="series"
          :options="options">
        </el-cascader>
        <!-- 图片上传 -->
        <div style="margin-top: 20px">
          <div style="color: #999; font-size: 12px; margin-bottom: 10px">轮播图尺寸：建议上传 950 x 350, 图片格式为png/gif/jpeg, 大小不大于2M</div>
          <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image">
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="upAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 首页已有轮播图 -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="series"
        label="车系">
      </el-table-column>
      <el-table-column
        width="980"
        label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.homePic" alt="">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表格
      tableData: [],
      // 定时器
      timer: null,
      n: 3,
      // 对话框
      dialogTableVisible: false,
      options: [],
      series: []
    }
  },
  methods: {
    // 获取首页轮播图
    async getSwiper () {
      const { data: res } = await this.$http.post('/pic/getHome')
      this.tableData = res
    },
    // 删除表格轮播图
    async handleDelete (row) {
      const res = await this.$http.post('/pic/xlb', {
        series: row.series
      })
      if (res.data !== true || res.status !== 200) {
        return this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.timer = setInterval(this.getRouter, 1000)
    },
    // 刷新页面
    getRouter () {
      this.n--
      if (this.n === 0) {
        clearInterval(this.timer)
        this.$router.go(0)
      }
    },
    // 新增轮播图
    addSwiper () {
      this.dialogTableVisible = true
      this.getSeries()
    },
    // 获取品牌车系
    async getSeries () {
      const { data: res } = await this.$http.post('/pic/brandSeries')
      this.options = res
    },
    // 提交
    upAdd () {
      if (this.series.length === 0) {
        return this.$message.error('请选择品牌车系')
      }
      if (this.$refs.new_image.files[0] === undefined) {
        return this.$message.error('请上传照片')
      }
      const formData = new FormData()
      formData.append('image_data', this.$refs.new_image.files[0])
      this.$http.post('/upload/upload5', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res.status !== 200) {
          return this.$message.error('图片上传失败')
        }
        this.$http.post('/pic/slb', {
          series: this.series[1],
          homePic: res.data
        }).then(req => {
          if (req.status !== 200 || req.data !== true) {
            return this.$message.error('提交失败')
          }
          this.dialogTableVisible = false
          this.$message.success('上传成功')
          this.timer = setInterval(this.getRouter, 1000)
        }).catch(req => {
        })
      }).catch(res => {
      })
    }
  },
  created () {
    // 获取首页轮播图
    this.getSwiper()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 20px;
}
</style>
