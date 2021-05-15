<template>
  <el-table
    :data="tableData"
    :header-cell-style="{ 'text-align': 'center' }"
    :cell-style="{ 'text-align': 'center' }"
    stripe
    style="width: 100%">
    <el-table-column label="排名" width="150">
      <template slot-scope="scope">
        <span v-if="scope.$index === 0"><img src="../../../assets/media/first.png" alt=""></span>
        <span v-else-if="scope.$index === 1"><img src="../../../assets/media/second.png" alt=""></span>
        <span v-else-if="scope.$index === 2"><img src="../../../assets/media/third.png" alt=""></span>
        <span v-else>{{scope.$index + 1}}</span>
      </template>
    </el-table-column>
    <el-table-column label="标题">
      <template slot-scope="scope">
        <span style="cursor: pointer;" @click="clickName(scope.row)">{{scope.row.title}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="clickNum" label="点击数">
    </el-table-column>
    <el-table-column label="头像" width="150">
      <template slot-scope="scope">
        <img @click="userImg(scope.row)" style="width: 60px; height: 60px; border-radius: 50%;cursor: pointer;" :src="scope.row.key.headPic" alt="">
      </template>
    </el-table-column>
    <el-table-column label="关注" width="150">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" v-show="scope.row.key.bgz === false" @click="clickFollow(scope.row.keyId)">+ 关注</el-button>
        <el-button type="success" style="margin: 0" size="mini" v-show="scope.row.key.bgz === true" @click="clickFollow(scope.row.keyId)">已关注</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Cookie from 'js-cookie'
import { follow } from '../../../assets/js/request'
export default {
  props: ['title'],
  data () {
    return {
      // 详情
      tableData: [],
      demo: this.title
    }
  },
  watch: {
    title (newVal) {
      this.demo = newVal
      this.getTable()
    }
  },
  methods: {
    // 获取数据
    async getTable () {
      const { data: res } = await this.$http.post('/key/ivRank', {
        type: this.demo,
        userId: Cookie.get('ID') || ''
      })
      this.tableData = res
    },
    // 关注
    async clickFollow (id) {
      if (!Cookie.get('ID') || !Cookie.get('token')) return this.$message.error('请先登录哦')
      const res = await follow({ userId: Cookie.get('ID'), keyId: id })
      if (res.data !== true || res.status !== 200) return this.$message.error('操作失败')
      this.getTable()
    },
    // 点击名称跳转详情
    clickName (row) {
      if (row.type === '重点号资讯') {
        const { href } = this.$router.resolve({
          path: '/media/details/infor',
          query: { id: row.id }
        })
        window.open(href, '_blank')
      } else {
        const { href } = this.$router.resolve({
          path: '/media/details/video',
          query: { id: row.id }
        })
        window.open(href, '_blank')
      }
    },
    // 个人主页面
    userImg (row) {
      const { href } = this.$router.resolve({
        path: '/media/user',
        query: { id: row.keyId }
      })
      window.open(href, '_blank')
    }
  },
  created () {
    this.getTable()
  }
}
</script>

<style lang="less" scoped>
</style>
