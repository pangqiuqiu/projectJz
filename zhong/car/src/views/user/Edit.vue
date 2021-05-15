<template>
  <div>
    <!-- 帖子标题 -->
    <el-row :gutter="20">
      <el-col :span="3">
        <h3>帖子标题</h3>
      </el-col>
      <el-col :span="21">
        <el-input v-model="form.title"></el-input>
      </el-col>
    </el-row>
    <!-- 富文本编辑器 -->
    <Wang :title="title" @func="getMsg"></Wang>
    <!-- 提交 -->
    <div>
      <el-button @click="saveHtml" type="primary">发布</el-button>
    </div>
  </div>
</template>

<script>
import Wang from '../../components/editor/Wang'
export default {
  components: {
    Wang
  },
  data () {
    return {
      // 提交信息
      form: {
        id: '',
        title: '',
        content: ''
      },
      title: '', // 编辑前的内容
      // 帖子详情
      postObj: {}
    }
  },
  methods: {
    // 获取帖子详情
    async getPost () {
      const id = this.$route.query.id
      const { data: res } = await this.$http.post('/Invit/getInvit', {
        id: id
      })
      this.form.title = res.title
      this.title = res.text
    },
    // 提交
    async saveHtml () {
      const res = await this.$http.post('/Invit/updateInvit', {
        id: this.$route.query.id,
        title: this.form.title,
        text: this.form.content
      })
      if (res.status !== 200 || res.data !== true) return this.$message.error('修改失败')
      this.$message.success('修改成功')
      this.$router.push('/user/forum')
    },
    // 编辑后的内容
    getMsg (data) {
      this.form.content = data
    }
  },
  created () {
    this.getPost()
  }
}
</script>

<style lang="less" scoped>
.el-row {
  display: flex;
  align-items: center;
  padding-top: 20px;
  margin-bottom: 20px;
}
.el-button {
  width: 100%;
  margin-top: 20px;
}
</style>
