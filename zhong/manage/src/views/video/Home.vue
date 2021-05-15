<template>
  <div>
    <h3>视频列表</h3>
    <el-button class="add" size="small" @click="addVideo" type="primary">新增视频</el-button>
    <!-- 搜索条件 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="车系">
          <el-cascader :props="{ value: 'label', label: 'label'}" filterable v-model="value" :options="options" placeholder="请选择车系" size="mini"></el-cascader>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="formInline.type" placeholder="请选择类型" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option label="原创视频" value="原创视频"></el-option>
            <el-option label="新车视频" value="新车视频"></el-option>
            <el-option label="试驾视频" value="试驾视频"></el-option>
            <el-option label="技术视频" value="技术视频"></el-option>
            <el-option label="车展视频" value="车展视频"></el-option>
            <el-option label="重点号视频" value="重点号视频"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="位置">
          <el-select v-model="formInline.home" placeholder="请选择类型" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option label="普通视频" value="普通视频"></el-option>
            <el-option label="首页焦点图" value="首页焦点图"></el-option>
            <el-option label="首页焦点标题" value="首页焦点标题"></el-option>
            <el-option label="首页专栏图1" value="首页专栏图1"></el-option>
            <el-option label="首页专栏图2-7" value="首页专栏图2-7"></el-option>
            <el-option label="视频首页列表图" value="视频首页列表图"></el-option>
            <el-option label="重点号首页轮播图" value="重点号首页轮播图"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input style="width: 300px" v-model="formInline.title" placeholder="请输入标题" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 列表 -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="type"
        label="类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="series"
        label="车系"
        width="200">
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <span @click="playback(scope.row.id)">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="home"
        label="位置"
        width="150">
      </el-table-column>
      <el-table-column label="封面图" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.coverPic" alt="">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <div class="btn">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">修改</el-button>
            <el-button
              size="mini"
              @click="handleExam(scope.row)" v-show="scope.row.type === '重点号视频'" style="margin: 10px 0">审核</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)" style="margin: 10px 0">删除</el-button>
          </div>
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
    <!-- 修改视频对话框 -->
    <el-dialog title="修改视频位置" :visible.sync="dialogFormVisible">
      <el-radio-group v-model="radio">
        <el-radio :label="'首页焦点图'">首页焦点图</el-radio>
        <el-radio :label="'首页焦点标题'">首页焦点标题</el-radio>
        <el-radio :label="'首页专栏图1'">首页专栏图1</el-radio>
        <el-radio :label="'首页专栏图2-7'">首页专栏图2-7</el-radio>
        <el-radio :label="'视频首页列表图'">视频首页列表图</el-radio>
        <el-radio :label="'普通视频'">普通视频</el-radio>
        <el-radio :label="'重点号首页轮播图'" v-show="this.flag">重点号首页轮播图</el-radio>
      </el-radio-group>
      <!-- <h2>封面图</h2>
      <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image">
      <div style="font-size: 12px;color: #999;">尺寸为200x100; 图片格式为png/gif/jpeg, 大小不大于2M (如果不修改封面图，可以省略此项)</div> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submission">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 视频审核 -->
    <el-dialog title="视频审核" :visible.sync="dialogVideoVisible">
      <el-input type="textarea" v-model="cause" placeholder="请输入拒绝原因"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoVisible = false">取 消</el-button>
        <el-button type="primary" @click="videoExam('已通过')">已通过</el-button>
        <el-button type="danger" @click="videoExam('未通过')">未通过</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 搜索条件
      value: [],
      formInline: {
        series: '',
        type: '',
        home: '',
        title: '',
        pageSize: 20,
        pageNo: 1
      },
      total: 0,
      tableData: [],
      // 品牌车型
      options: [],
      // 修改对话框
      dialogFormVisible: false,
      rowObj: {},
      radio: '',
      formLabelWidth: '120px',
      flag: '',
      // 审核对话框
      dialogVideoVisible: false,
      cause: '',
      videoForm: {
        state: '',
        id: '',
        cause: '',
        token: window.sessionStorage.getItem('token')
      }
    }
  },
  created () {
    // 获取视频列表
    this.getVideoList()
    // 获取品牌车系
    this.getBrandSeries()
  },
  methods: {
    // 获取视频列表
    async getVideoList () {
      this.formInline.series = this.value[1]
      const { data: res } = await this.$http.post('/video/getVideoList', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 获取品牌车系
    async getBrandSeries () {
      const { data: res } = await this.$http.post('/car/jilian')
      this.options = res
    },
    // 新增视频
    addVideo () {
      this.$router.push('/video/add')
    },
    // 提交
    onSubmit () {
      this.formInline.pageNo = 1
      this.getVideoList()
    },
    // 分页
    changePage (index) {
      this.formInline.pageNo = index
      this.getVideoList()
    },
    // 修改
    handleEdit (row) {
      this.rowObj = row
      this.radio = row.home
      if (row.type === '重点号视频') {
        this.flag = true
      } else {
        this.flag = false
      }
      this.dialogFormVisible = true
    },
    // 确认修改
    async submission () {
      const res = await this.$http.post('/video/updateHome', {
        home: this.radio,
        id: this.rowObj.id
      })
      if (res.status !== 200 || res.data !== true) {
        return this.$message.error('修改失败')
      }
      this.$message.success('修改成功')
      this.dialogFormVisible = false
      this.onSubmit()
    },
    // async submission () {
    //   if(this.$refs.new_image.files[0] === undefined) {
    //     const res = await this.$http.post('/video/updateHome', {
    //       home: this.radio,
    //       id: this.rowObj.id
    //     })
    //     if (res.status !== 200 || res.data !== true) {
    //       return this.$message.error('修改失败')
    //     }
    //     this.$message.success('修改成功')
    //     this.dialogFormVisible = false
    //     this.onSubmit()
    //   } else {
    //     const formData = new FormData()
    //     formData.append('image_data', this.$refs.new_image.files[0])
    //     const rew = await this.$http.post('/upload/upload5', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     })
    //     if (rew.status !== 200 || rew.data === '图片上传失败！') {
    //       return this.$message.error('图片上传失败')
    //     }
    //     const res = await this.$http.post('/video/updateHome', {
    //       home: this.radio,
    //       id: this.rowObj.id,
    //       coverPic: rew.data
    //     })
    //     if (res.status !== 200 || res.data !== true) {
    //       return this.$message.error('修改失败')
    //     }
    //     this.$message.success('修改成功')
    //     this.dialogFormVisible = false
    //     this.onSubmit()
    //   }
    // },
    // 删除
    handleDelete (row) {
      this.$confirm('确定要删除此篇视频吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async () => {
        const res = await this.$http.post('/video/delVideo', {
          id: row.id
        })
        if (res.status !== 200 || res.data !== true) {
          return this.$message.error('删除失败')
        }
        this.$message.success('删除成功')
        this.onSubmit()
      }).catch(() => {
      })
    },
    // 审核视频
    handleExam (row) {
      this.dialogVideoVisible = true
      this.videoForm.id = row.id
    },
    // 是否通过审核
    async videoExam (index) {
      if (index === '未通过' && this.cause.trim().length === 0) return this.$message.error('请输入拒绝原因')
      this.videoForm.cause = this.cause
      this.videoForm.state = index
      const res = await this.$http.post('/video/updateState', this.videoForm)
      if (res.status !== 200 || res.data !== true) return this.$message.error('操作失败')
      this.$message.success('操作成功')
      this.dialogVideoVisible = false
      this.getVideoList()
    },
    // 前端视频播放
    playback (id) {
      window.open(`https://zhongdianqiche.com/car/#/video/details?id=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin: 15px 0;
  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
}

.add {
  margin-top: 10px;
}

.el-radio {
  margin-bottom: 15px;
}

span {
  cursor: pointer;
}

img {
  width: 200px;
  height: 100px;
}

.btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-button {
    width: 60px;
    margin-left: 0;
  }
}

// 分页
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
