<template>
  <div>
    <h3>充值</h3>
    <!-- tab切换 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="二维码充值" name="first">
        <div class="weixin">
          <img class="image" src="../../assets/money/money.jpg" alt="">
          <div>手机微信扫描二维码立即充值</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="银行转账充值" name="second">
        <div class="weixin">
          <div>公司名称：北京一七网络技术有限公司</div>
          <div>账号：110061307018010057169</div>
          <div>开户行：交通银行北京西三环支行</div>
          <div>充值及发票如有疑问请联系：4008-1234-17</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
h3 {
  margin-bottom: 20px;
}

.weixin {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  div {
    margin-bottom: 10px;
  }
  .image {
    width: 200px;
    margin-bottom: 15px;
  }
}
</style>
