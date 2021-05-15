<template>
  <div>
    <div class="HeadTitle">
      <h2>合同信息</h2>
      <el-button type="text" @click="back">《《 返回</el-button>
    </div>
    <div class="account">
      <div class="left">
        <el-button type="primary" @click="look()">合同预览</el-button>
      </div>
    </div>
    <div class="main">
      <el-row :gutter="20">
        <el-col :span="4" class="col">合同类型</el-col>
        <el-col :span="16">
          <el-select  :disabled="id>0" v-model="shop.type" placeholder="请选择合同类型" style="width:50%">
            <el-option label="充值" value="充值"></el-option>
            <el-option label="软件使用" value="软件使用"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="col">充值金额</el-col>
        <el-col :span="16">
          <el-input :readonly="id>0" v-model="shop.price" placeholder="请输入金额" style="width:50%"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="col">关联店方名称</el-col>
        <el-col :span="16">
          <el-select :disabled="id>0" @change="ggg" v-model="shop.dealerId" placeholder="请选店方名称" style="width:50%">
            <el-option v-for="item in dealerAry" :key="item.id" :label="item.name4s" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="col">甲方签约主体</el-col>
        <el-col :span="16">
          <el-input :readonly="id>0" v-model="shop.dealerName" placeholder="请输入内容" style="width:50%"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="col">甲方联系地址</el-col>
        <el-col :span="16">
          <el-input :readonly="id>0" v-model="shop.address" placeholder="请输入内容" style="width:50%"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="col">甲方联系人</el-col>
        <el-col :span="16">
          <el-input :readonly="id>0" v-model="shop.contacts" placeholder="请输入内容" style="width:50%"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="col">甲方联系电话</el-col>
        <el-col :span="16">
          <el-input :readonly="id>0" v-model="shop.phone" placeholder="请输入内容" style="width:50%"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="col">预计付款时间</el-col>
        <el-col :span="16">
          <el-date-picker :readonly="id>0" style="width:50%" v-model="shop.payDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="选择日期"/>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <el-button type="primary" @click="submit" style="width:50%">提交</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id:'',
      // 店铺信息
      shop: {
        type: '',
        dealerId: '',
        price: '',
        contacts: '',
        phone: '',
        address: '',
        payDate: ''
      },
      dealerAry:[],
      pdfsrc: 'https://jskjcontract.oss-cn-zhangjiakou.aliyuncs.com/testout.pdf',  // 文件地址
    }
  },
  methods: {
    // 获取经销商信息
    async getList () {
      const { data: res } = await this.$http.post('/dealer/dealerByContract', {
        token: window.sessionStorage.getItem('token')
      })
      this.dealerAry = res
      this.shop.type = "充值"
      if(this.dealerAry.length>0){
        this.shop.dealerId = this.dealerAry[0].id
        this.ggg(this.shop.dealerId)
      }
      
    },
    async getContract () {
      const { data: res } = await this.$http.post('/contract/getContract', {
        id: this.id
      })
      this.dealerAry = [{id:res.dealerId,name4s:res.dealerName}]
      this.shop.type = res.type
      this.shop.address = res.address
      this.shop.phone = res.phone
      this.shop.contacts = res.contacts
      this.shop.dealerName = res.dealerName
      this.shop.dealerId = res.dealerId
      this.shop.price = res.price
      this.shop.payDate = res.payDate
      this.pdfsrc = res.url
      
    },
    // 返回上一页面
    back () {
      this.$router.go(-1)
    },
    ggg (index) {
       for (let i = 0; i < this.dealerAry.length; i++) {
            const item = this.dealerAry[i]
            if (item.id === index) {
              this.shop.dealerName = item.name4s
              this.shop.contacts = item.link
              this.shop.phone = item.phone
              this.shop.address = item.address
          }
        }
    },
    async look () {
      window.open(this.pdfsrc,"_blank");
      return false;
    },
    // 提交
    async submit () {
      const rew = await this.$http.post('/contract/addContract', this.shop)
      if (rew.status !== 200 || rew.data !== true) {
        return this.$message.error('提交失败')
      }
      this.$message.success('新建成功')
      this.$router.go(0)
    }
  },
  created () {
    this.id = Number(this.$route.query.id)
    if (this.id > 0) {
      this.getContract()
    }else{
      // 获取经销商信息
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
// 账户余额
.account {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 20px;
  margin-top: 20px;
  margin-bottom: 30px;
  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .limit {
      margin: 20px;
    }
  }
}
h2 {
  margin-bottom: 20px;
}
// 头部标题
.HeadTitle {
  display: flex;
  justify-content: space-between;
  background-color: #f7f8f9;
  padding-left: 30px;
  height: 50px;
  line-height: 50px;
  margin-bottom: 30px;
}
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
