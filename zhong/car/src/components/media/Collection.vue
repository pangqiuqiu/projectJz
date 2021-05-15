<template>
  <div>
    <el-button type="primary" size="mini" v-show="this.btn === false" @click="clickFollow()">+ 关注</el-button>
    <el-button type="success" size="mini" v-show="this.btn === true" @click="clickFollow()">已关注</el-button>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  props: ['btn', 'others'],
  data () {
    return {}
  },
  methods: {
    async clickFollow () {
      const res = await this.$http.post('/index', {
        loginId: Cookie.get('ID'),
        userId: this.others
      })
      if (res.status !== 200 || res.data !== true) {
        return this.$message.error('操作失败')
      }
      this.$message.success('操作成功')
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
}
</style>
