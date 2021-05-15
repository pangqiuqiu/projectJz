<template>
  <div>
    <!-- 用户ID -->
    <h3>系统消息</h3>
    <el-divider></el-divider>
    <!-- 回复 -->
    <h2 v-show="this.list.length === 0">您暂时没有收到任何回复</h2>
    <ul>
      <li v-for="item in list" :key="item.id">
        <el-alert :title="item.message" :type="item.state === '已读' ? '' : 'success'" :closable="false">{{item.mDate}}</el-alert>
      </li>
    </ul>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    async getUserSys () {
      const { data: res } = await this.$http.post('/mess/showMess', {
        userId: Cookie.get('ID')
      })
      this.list = res
    }
  },
  created () {
    // 获取系统消息
    this.getUserSys()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 10px;
}

li {
  margin-top: 10px;
}
</style>
