<template>
  <div class="in">
    <div class="fo">
      <!-- 第一行 -->
      <el-row :gutter="20">
        <el-col class="firstRow" :span="12" :offset="6">
          <router-link to="/us/about">
            <span>关于我们</span>
          </router-link>
          <span>|</span>
          <router-link to="/us/contact">
            <span>联系我们</span>
          </router-link>
          <span>|</span>
          <router-link to="/us/privacy">
            <span>隐私政策</span>
          </router-link>
          <span>|</span>
          <span>iPhone客户端</span>
          <span>|</span>
          <span>Android客户端</span>
          <span>|</span>
          <router-link to="/us/license">
            <span>营业执照</span>
          </router-link>
        </el-col>
      </el-row>
      <!-- 第二行 -->
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <span>皖ICP备20007549号</span>
          <span>公司电话：18655751780</span>
          <span>公司邮箱：zdqc@zdzixun.com</span>
          <span>公司地址：安徽省合肥市瑶海区站前广场</span>
        </el-col>
      </el-row>
      <!-- 第三行 -->
      <el-row :gutter="20">
        <el-col :span="7" :offset="8">
          <span class="rightBor">www.zhongdianqiche.com</span>
          <span>|</span>
          <span>重点汽车 版权所有</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.fo {
  margin: 20px auto;
  color: #7E7E7E;
  font-size: 14px;
  .el-row {
    height: 30px;
    width: 1200px;
    margin: 0 auto!important;
    .el-col {
      display: flex;
      justify-content: space-between;
    }
  }
}

a {
  text-decoration: none;
  color: #7E7E7E;
}
</style>
