<template>
  <div>
    <h3>推广设置</h3>
    <!-- 车系列表 -->
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <div>{{item.brand}} - {{item.series}}</div>
        <el-radio-group v-model="list[index].state" @change="change(item)">
          <el-radio :label="'开启'">开启推广</el-radio>
          <el-radio :label="'暂停'" :disabled="list[index].state === '未开启' ? true : false">暂停推广</el-radio>
        </el-radio-group>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 获取品牌车型
    async getBrand () {
      const { data: res } = await this.$http.post('/car/brandSeries')
      this.list = res
    },
    // 改变单选框组
    async change (item) {
      const res = await this.$http.post('/sale/sale', item)
      if (res.data !== true || res.status !== 200) return this.$message.error('操作失败')
    }
  },
  created () {
    // 获取品牌车型
    this.getBrand()
  }
}
</script>

<style lang="less" scoped>
ul {
  border-top: 1px solid #ccc;
  padding: 0;
}
li {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  div {
    width: 500px;
  }
}
</style>
