<template>
  <div>
    <div class="title">
      <h2>本店报价<span>(报价不得低于官方价的75%)</span></h2>
      <div>单位：万元</div>
    </div>
    <el-row :gutter="20">
      <el-col :span="20" :offset="1" v-for="(item,index) in list" :key="item.id">
        <div>
          <h4>{{item.token}}</h4>
          <el-button type="primary" :disabled="item.tj === 0" size="mini" @click="top(item)" v-show="item.tj2 === 0">近期推荐</el-button>
          <el-button type="success" size="mini" @click="bottom(item)" v-show="item.tj2 !== 0">下架推荐</el-button>
          <el-select @visible-change="changeCount($event)" v-model="list[index].tj" size="mini" placeholder="请选择推荐次序">
            <el-option v-for="item in count" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <ul>
          <li v-for="(items,index) in item.list" :key="index">
            <span>{{items.c}}</span>
            <el-input type="number" size="mini" placeholder="车型报价" v-model="item.list[index].offer"></el-input>
          </li>
        </ul>
      </el-col>
      <el-col :span="17" :offset="1">
        <el-button type="success" @click="submit" style="width: 86%">确定提交报价</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      // 报价
      obj: {},
      // 排序
      count: []
    }
  },
  created () {
    // 车型列表
    this.getList()
  },
  methods: {
    // 经销商报价
    async getList () {
      const { data: res } = await this.$http.post('/dealer/Offer', {
        token: window.sessionStorage.getItem('token')
      })
      this.list = res
    },
    // 排序列表
    async changeCount (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/dealer/tjyx', {
          token: window.sessionStorage.getItem('token')
        })
        this.count = res
      }
    },
    // 提交
    async submit () {
      let bol = true;
      for (let j = 0;j < this.list.length; j++) {
        this.obj = {}
        for (let i = 0; i < this.list[j].list.length; i++) {
          var item = this.list[j].list[i]
          if (item.offer !== 0) this.obj[item.id] = item.offer
        }
        const res = await this.$http.post('/dealer/addOffer', {
          token: window.sessionStorage.getItem('token'),
          obj: JSON.stringify(this.obj)
        })
        if (res.status !== 200) {
          return this.$message.error('修改失败')
        }
        if (res.data === false) {
          bol = false
          const ary = res.data
          alert(ary + '不合法报价')
        }
      }
      if (bol) {
        this.$message.success('修改成功')
        this.$router.go(0)
      }
    },
    // 近期推荐(上)
    async top (item) {
      console.log(item)
      const res = await this.$http.post('/dealer/tj', {
        series: item.token,
        token: window.sessionStorage.getItem('token'),
        tj: item.tj
      })
      if (res.status !== 200 || res.data !== true) {
        return this.$message.error('操作失败')
      }
      this.$router.go(0)
    },
    // 近期推荐(下)
    async bottom (item) {
      const res = await this.$http.post('/dealer/tj', {
        series: item.token,
        token: window.sessionStorage.getItem('token'),
        tj: 0
      })
      if (res.status !== 200 || res.data !== true) {
        return this.$message.error('操作失败')
      }
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  h2 {
    margin-right: 40px;
  }
  span {
    font-size: 14px;
    color: red;
  }
}
.el-col {
  margin-bottom: 20px;
  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .el-button {
      margin: 0 20px;
    }
  }
  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
    span {
      width: 400px;
    }
    .el-input {
      width: 200px;
    }
  }
}
</style>
