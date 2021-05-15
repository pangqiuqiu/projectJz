<template>
  <div>
    <!-- 标题 -->
    <h1>{{this.obj.title}}</h1>
    <!-- 4s/作者/时间 -->
    <div class="else">
      <div>{{this.obj.dealer}}</div>
      <div class="username">{{this.obj.username}}</div>
      <div>{{this.obj.issueDate}}</div>
    </div>
    <!-- 正文 -->
    <div class="wang" v-html="this.obj.text"></div>
    <!-- 操作判断 -->
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="仅上线"></el-checkbox>
      <el-checkbox label="分站首页"></el-checkbox>
      <el-checkbox label="网站首页" :disabled="isAll"></el-checkbox>
      <el-checkbox label="驳回"></el-checkbox>
    </el-checkbox-group>
    <div class="btn">
      <el-button type="primary" :disabled="disabledBtn" @click="submit">确定</el-button>
    </div>
    <!-- 拒绝原因 -->
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <textarea placeholder="请输入拒绝原因" v-model="textarea"></textarea>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 资讯
      obj: {},
      // 驳回原因
      textarea: '',
      // 复选框
      checkList: [],
      // 用户等级
      level: 0
    }
  },
  created () {
    // 获取资讯
    this.getInformation()
    // 获取登陆人等级
    this.getLevel()
  },
  computed: {
    // 判断复选框是否禁用
    isAll () {
      if (this.level === 1 || this.level === 2) return false
      return true
    },
    // 判断按钮是否禁用
    disabledBtn () {
      if ((this.checkList.indexOf('驳回') !== -1 || this.checkList.indexOf('仅上线') !== -1) && this.checkList.length > 1) return true
      return false
    }
  },
  methods: {
    // 获取资讯
    async getInformation () {
      const id = this.$route.query.id
      const { data: res } = await this.$http.post('/Infor/getOneInfor', {
        id: id
      })
      this.obj = res
    },
    // 获取登陆人等级
    async getLevel () {
      const { data: res } = await this.$http.post('/user/level')
      this.level = res
    },
    // 确定提交
    async submit () {
      if (this.checkList.indexOf('驳回') !== -1 && this.textarea.trim().length === 0) return this.$message.error('请输入驳回原因')
      const res = await this.$http.post('/Infor/sh', {
        ary: this.checkList,
        cause: this.textarea,
        id: this.obj.id
      })
      if (res.data !== true || res.status !== 200) return this.$message.error('操作失败')
      this.$message.success('操作成功')
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
h1 {
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
}
.else {
  display: flex;
  justify-content: center;
  color: #999;
  .username {
    margin: 0 20px;
  }
}
.el-checkbox-group {
  text-align: center;
}
.btn {
  margin: 20px 0;
  text-align: center;
  .el-button {
    width: 400px;
  }
}
textarea {
  margin-top: 20px;
  resize: none;
  width: 100%;
  height: 300px;
}
// 编辑器
.wang {
  table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  table td,
  table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }
  table th {
    border-bottom: 1px solid #ccc;
    text-align: center;
  }
}
</style>
