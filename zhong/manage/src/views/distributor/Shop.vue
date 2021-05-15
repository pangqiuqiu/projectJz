<template>
  <div>
    <h2>公司信息</h2>
    <div class="main">
      <el-row :gutter="20">
        <el-col :span="4" class="col">店名</el-col>
        <el-col :span="16">
          <el-input disabled v-model="shop.name4s" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="col">门店地址</el-col>
        <el-col :span="16">
          <el-input v-model="shop.address" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="col">销售热线</el-col>
        <el-col :span="16">
          <el-input v-model="shop.sell" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="col">售后服务电话</el-col>
        <el-col :span="16">
          <el-input v-model="shop.afterSell" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="col">传真</el-col>
        <el-col :span="16">
          <el-input v-model="shop.fax" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="col">电子邮箱</el-col>
        <el-col :span="16">
          <el-input v-model="shop.email" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="col">公司网站地址</el-col>
        <el-col :span="16">
          <el-input v-model="shop.web" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="col">公司介绍</el-col>
        <el-col :span="16">
          <textarea v-model="shop.introduce" placeholder="请输入内容"></textarea>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10" :offset="4">
          <el-button type="primary" @click="submit">提交</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 店铺信息
      shop: {
        name4s: '',
        address: '',
        sell: '',
        afterSell: '',
        fax: '',
        email: '',
        web: '',
        introduce: '',
        token: window.sessionStorage.getItem('token')
      }
    }
  },
  methods: {
    // 获取经销商信息
    async getList () {
      const { data: res } = await this.$http.post('/dealer/getContact', {
        token: window.sessionStorage.getItem('token')
      })
      this.shop.name4s = res.name4s
      this.shop.address = res.address
      this.shop.sell = res.sell
      this.shop.afterSell = res.afterSell
      this.shop.fax = res.fax
      this.shop.email = res.email
      this.shop.web = res.web
      this.shop.introduce = res.introduce
    },
    // 提交
    async submit () {
      const rew = await this.$http.post('/dealer/updateContact', this.shop)
      if (rew.status !== 200 || rew.data !== true) {
        return this.$message.error('提交失败')
      }
      this.$message.success('修改成功')
      this.$router.go(0)
    }
  },
  created () {
    // 获取经销商信息
    this.getList()
  }
}
</script>

<style lang="less" scoped>
h2 {
  margin-bottom: 30px;
}
.el-row {
  height: 40px;
  margin-bottom: 20px;
  .col {
    line-height: 40px;
  }
}
.main {
  margin-left: 60px;
  .el-input {
    width: 500px;
  }
  textarea {
    resize: none;
    height: 300px;
    width: 100%;
  }
  .el-button {
    margin-top: 30px;
    width: 100%;
  }
}
</style>
