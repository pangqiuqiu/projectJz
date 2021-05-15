<template>
  <el-container class="w">
    <!-- 左侧主体 -->
    <el-main width="830px">
      <el-card shadow="never">
        <h2>{{this.obj.name4s}}</h2>
        <p>{{this.obj.introduce}}</p>
        <ul>
          <li>
            <label>销售热线：</label>
            <span>{{this.obj.sell}}</span>
          </li>
          <li>
            <label>售后服务热线：</label>
            <span>{{this.obj.afterSell}}</span>
          </li>
          <li>
            <label>传真：</label>
            <span>{{this.obj.fax}}</span>
          </li>
          <li>
            <label>电子邮箱：</label>
            <span>{{this.obj.email}}</span>
          </li>
          <li>
            <label>网站地址：</label>
            <span>{{this.obj.web}}</span>
          </li>
          <li>
            <label>公司地址：</label>
            <span>{{this.obj.address}}</span>
          </li>
        </ul>
      </el-card>
    </el-main>
    <!-- 右侧商家地址 -->
    <el-aside style="padding-top: 20px;">
      <Distributor></Distributor>
    </el-aside>
  </el-container>
</template>

<script>
import Distributor from '../../components/Distributor.vue'
const id = window.sessionStorage.getItem('distributorId')
export default {
  components: {
    Distributor
  },
  data () {
    return {
      obj: {}
    }
  },
  methods: {
    // 获取信息
    async getItem () {
      const { data: res } = await this.$http.post(`/dealer/getContact`, {
        dealerId: id
      })
      this.obj = res
    }
  },
  created () {
    // 获取信息
    this.getItem()
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
li {
  margin-top: 10px;
  span:nth-of-type(1) {
    color: red;
  }
  label {
    margin-right: 5px;
  }
}
h2 {
  text-align: center;
}
</style>
