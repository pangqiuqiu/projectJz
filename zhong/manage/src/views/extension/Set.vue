<template>
  <div>
    <h3>推广设置</h3>
    <!-- 账号余额 -->
    <div class="account">
      <div class="left">
        <h4>账户余额: <span> {{count}} </span>元</h4>
        <span class="limit">(每日限额: {{limit}}元)</span>
        <el-button type="text" @click="everyDay">修改每日限额</el-button>
      </div>
      <div>
        <el-button type="primary" size="small" @click="recharge">账号充值</el-button>
      </div>
    </div>
    <!-- 选择推广的平台 -->
    <div class="platform">
      <!-- 版本 -->
      <h4>{{edition}}</h4>
      <!-- 推广设置 -->
      <div class="set">
        <div class="item">
          <img src="../../assets/money/money.jpg" alt="">
          <el-button type="primary" size="small" @click="details">推广设置</el-button>
        </div>
        <div class="item">
          <img src="../../assets/money/money.jpg" alt="">
          <el-button type="primary" size="small">推广设置</el-button>
        </div>
        <div class="item">
          <img src="../../assets/money/money.jpg" alt="">
          <el-button type="primary" size="small">推广设置</el-button>
        </div>
      </div>
    </div>
    <!-- 版本介绍 -->
    <div class="introduce">
      <h4>版本介绍</h4>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 账号余额
      count: 0,
      // 每日限额
      limit: 0,
      // 版本
      edition: '豪华版'
    }
  },
  created () {
    // 获取账户余额和限额
    this.getCount()
  },
  methods: {
    // 获取账户余额和限额
    async getCount () {
      const { data: res } = await this.$http.post('/money/getOneConsume')
      this.count = res.balance
      this.limit = res.norm
    },
    // 修改每日限额
    everyDay () {
      this.$prompt('每日限额', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).catch(() => {
        console.log('取消')
      }).then(async ({ value }) => {
        const res = await this.$http.post('/money/norm', {
          norm: value
        })
        if (res.data !== true || res.status !== 200) return this.$message.error('修改失败')
        this.$message.success('修改成功')
        this.getCount()
      })
    },
    // 账户充值
    recharge () {
      this.$router.push('/finance/recharge')
    },
    // 设置推广详情
    details () {
      this.$router.push('/extension/list')
    }
  }
}
</script>

<style scoped lang="less">
// 账户余额
.account {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 0 20px;
  margin-top: 20px;
  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .limit {
      margin: 20px;
    }
  }
}
// 选中推广平台
.platform {
  h4 {
    font-weight: normal;
    height: 50px;
    line-height: 50px;
  }
  .set {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 30px;
      margin-bottom: 20px;
      border: 1px solid #cccccc;
      padding: 10px;
      img {
        width: 300px;
        margin-bottom: 15px;
      }
    }
  }
}
// 版本介绍
.introduce {
  h4 {
    font-weight: normal;
    margin-bottom: 20px;
  }
}
</style>
