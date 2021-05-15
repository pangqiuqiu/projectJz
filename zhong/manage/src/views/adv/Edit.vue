<template>
  <div>
    <!-- 广告位置 -->
    <h2>{{this.advObj.name}}</h2>
    <!-- 已经设定的广告 -->
    <el-table :data="tableData" border style="width: 100%"
      :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          <img :src="scope.row.pic" alt="" style="width: 100%">
        </template>
      </el-table-column>
      <el-table-column prop="times" label="时效" width="150"></el-table-column>
      <el-table-column prop="title" label="标题" width="150"></el-table-column>
      <el-table-column prop="url" label="链接" width="150"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 广告尺寸 -->
    <el-row :gutter="20">
      <el-col :span="3">尺寸大小</el-col>
      <el-col :span="21">{{this.advObj.size}}</el-col>
    </el-row>
    <!-- 广告标题 -->
    <el-row :gutter="20">
      <el-col :span="3">广告标题</el-col>
      <el-col :span="21">
        <el-input v-model="form.title" style="width: 400px" placeholder="请输入广告标题" size="small"></el-input>
      </el-col>
    </el-row>
    <!-- 广告链接 -->
    <el-row :gutter="20">
      <el-col :span="3">广告链接</el-col>
      <el-col :span="21">
        <el-input v-model="form.url" style="width: 400px" placeholder="请输入广告链接内容" size="small"></el-input>
      </el-col>
    </el-row>
    <!-- 广告位置 -->
    <el-row :gutter="20">
      <el-col :span="3">广告地区位置</el-col>
      <el-col :span="21">{{this.advObj.area}}</el-col>
    </el-row>
    <!-- 广告时间 -->
    <el-row :gutter="20">
      <el-col :span="3">设置广告时间</el-col>
      <el-col :span="21">
        <el-checkbox-group v-model="form.time">
          <el-checkbox v-for="item in options" :key="item" :label="item"></el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <!-- 修改内容 -->
    <el-row :gutter="20">
      <el-col :span="3">修改广告内容</el-col>
      <el-col :span="21">
        <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image">
      </el-col>
    </el-row>
    <!-- 提交 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-button type="success" @click="updata">提交新广告</el-button>
        <!-- <el-button type="danger" @click="deleted">删除广告内容</el-button> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { dateConversion } from '../../assets/js/timer.js'
export default {
  data () {
    return {
      // 广告信息
      advObj: {},
      // 提交后台
      form: {
        url: '',
        pic: '',
        name: '',
        title: '',
        time: [], // 选择的时间数组
        area: '', // 省市
        type: '', // 级别
        size: '' // 尺寸
      },
      // 已经发布的广告
      tableData: [],
      options: []
    }
  },
  created () {
    // 获取广告信息
    this.getAdv()
    // 获取时间选择的数组
    this.getSelectedTime()
    // 已经发布的广告
    this.getTable()
  },
  methods: {
    // 获取广告信息
    getAdv () {
      const row = JSON.parse(this.$route.query.row)
      this.advObj = row
      this.form.area = this.advObj.area
      this.form.name = this.advObj.name
      this.form.type = this.advObj.type
      this.form.size = this.advObj.size
    },
    // 删除广告内容
    async handleDelete (row) {
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async () => {
        const res = await this.$http.post('/adv/delAdv', {
          id: row.id
        })
        if (res.data !== true || res.status !== 200) return this.$message.error('操作失败')
        this.$message.success('删除成功')
        this.getTable()
      }).catch(() => {
      })
    },
    // 提交新广告
    updata () {
      if (this.form.url === null) return this.$message.error('请填写广告外链')
      if (this.$refs.new_image.files[0] === undefined) return this.$message.error('请上传广告内容图片')
      const formData = new FormData()
      formData.append('image_data', this.$refs.new_image.files[0])
      this.$http.post('/upload/upload5', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res.data === '图片上传失败！') return this.$message.error('广告上传失败')
        this.form.pic = res.data
        this.$http.post('/adv/addAdv', this.form).then(rew => {
          if (rew.status !== 200 || rew.data !== true) return this.$message.error('修改失败')
          this.$router.go(0)
          this.$message.success('新增成功')
        })
      })
    },
    // 已经发布的广告
    async getTable () {
      const { data: res } = await this.$http.post('/adv/getAdvList', {
        area: this.advObj.area,
        name: this.advObj.name
      })
      this.tableData = res
    },
    // 获取时间选择的数组
    async getSelectedTime () {
      const { data: res } = await this.$http.post('/adv/sss', {
        name: this.advObj.name,
        area: this.advObj.area
      })
      this.options = res
    }
  }
}
</script>

<style lang="less" scoped>
h2 {
  text-align: center;
  margin-bottom: 30px;
}

.el-table {
  margin-bottom: 20px;
}

.el-row {
  margin-bottom: 30px;
}
</style>
