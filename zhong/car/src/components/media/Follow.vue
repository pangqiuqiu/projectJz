<template>
  <div>
    <el-button type="primary" size="mini" v-show="this.demo === false" @click="clickFollow">+ 关注</el-button>
    <el-button type="success" size="mini" v-show="this.demo === true" @click="clickFollow">已关注</el-button>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  props: ['btn', 'others'],
  data () {
    return {
      // 按钮状态
      demo: this.btn
    }
  },
  methods: {
    async clickFollow () {
      if (Cookie.get('ID') === undefined) return this.$message.error('请先登录哦')
      const res = await this.$http.post('/key/gz', {
        keyId: this.others,
        userId: Cookie.get('ID')
      })
      if (res.status !== 200 || res.data !== true) {
        return this.$message.error('操作失败')
      }
      this.$message.success('操作成功')
      this.demo = !this.demo
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.el-button {
  display: block;
  margin: 0 auto;
  padding: 5px;
}
</style>
