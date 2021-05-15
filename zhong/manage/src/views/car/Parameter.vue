<template>
  <div>
    <h2>{{this.title}}</h2>
    <div class="main">
      <ul>
        <li v-for="(item,i) in obj.o" :key="i">
          <span>{{i}}</span>
          <el-input type="text" v-model="obj.o[i]"></el-input>
        </li>
        <li v-for="(item,i) in obj.op" :key="i">
          <span>{{i}}</span>
          <el-input type="text" v-model="obj.op[i]"></el-input>
        </li>
        <li>
          <span>车身颜色</span>
          <el-input type="text" v-model="obj.color"></el-input>
        </li>
        <li>
          <span>内饰颜色</span>
          <el-input type="text" v-model="obj.innercolor"></el-input>
        </li>
      </ul>
    </div>
    <div class="btn">
      <el-button type="success" @click="submit">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 车型
      title: '',
      obj: {}
    }
  },
  methods: {
    // 获取参数列表
    async getTypeList () {
      const id = this.$route.query.id
      this.title = id
      const { data: res } = await this.$http.post('/car/getConfig', {
        c: id
      })
      this.obj = res
    },
    // 提交
    async submit () {
      const res = await this.$http.post('/car/update', this.obj)
      if (res.status !== 200 || res.data !== true) return this.$message.error('修改失败')
      this.$message.success('修改成功')
    }
  },
  created () {
    // 获取参数列表
    this.getTypeList()
  }
}
</script>

<style lang="less" scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}
.main {
  width: 750px;
  margin: 0 auto;
  li {
    margin-bottom: 20px;
  }
  span {
    display: inline-block;
    width: 280px;
  }
  .el-input {
    width: 400px;
  }
}
.btn {
  .el-button {
    width: 750px;
  }
  width: 750px;
  margin: 0 auto;
}
</style>
