<template>
  <div>
    <h2>权限管理</h2>
    <!-- 搜索条件 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true">
        <el-form-item label="手机号">
          <el-input v-model="phone" size="mini" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 权限 -->
    <div class="admin">
      <!-- 用户信息 -->
      <div class="left">
        <div>
          <label>员工ID</label>
          <span>{{this.obj.id}}</span>
        </div>
        <div>
          <label>姓名</label>
          <span>{{this.obj.name}}</span>
        </div>
        <div>
          <label>手机号</label>
          <span>{{this.obj.phone}}</span>
        </div>
        <div>
          <label>性别</label>
          <span>{{this.obj.sex}}</span>
        </div>
      </div>
      <div class="right">
        <div v-for="item in admin" :key="item.token">
          <h2>{{item.token}}</h2>
          <ul>
            <li v-for="items in item.list" :key="items.id">
              <el-checkbox :label="items.name" @change="change(items.id, items.is,item)" v-model="items.is"></el-checkbox>
            </li>
            <el-checkbox :label="item.ckName" @change="allChange(item.list,item.checked)" v-model="item.checked"></el-checkbox>
          </ul>
        </div>
        <el-button type="success" @click="submitForm" style="width: 100%" v-show="isShow">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 手机号
      phone: '',
      // 员工信息
      obj: {},
      // 权限列表
      admin: [],
      // 发送后台的ID数据
      adminList: [],
      // 提交按钮
      isShow: false
    }
  },
  methods: {
    // 查找
    async submit () {
      // 根据手机号获取员工信息
      if (!(/^1[3456789]\d{9}$/.test(this.phone))) return this.$message.error('手机号码有误，请重新填写')
      const { data: res } = await this.$http.post('/user/getUserByPhone', { phone: this.phone })
      this.obj = res
      // 获取权限列表
      const { data: rew } = await this.$http.post('/user/ShowQx', {
        phone: this.phone,
        userId: this.obj.id
      })
      this.admin = rew
      // console.log(rew)
      // 显示提交按钮
      this.isShow = true
      // 获取数组中已有权限
      //每个栏目增加全选 2021-3-9 zy
      this.admin.map(item => {
            item.checked = true
            item.ckName = "全选"
            return item
      })
      for (let i = 0; i < this.admin.length; i++) {
        var count = 0
        const item = this.admin[i].list
        for (let j = 0; j < item.length; j++) {
          if (item[j].is === true) {
            count++
            this.adminList.splice(1, 0, item[j].id)
          }
        }
        if(item.length ===count ){
           this.admin[i].checked = true
        }else{
          this.admin[i].checked = false
        }
      }
      // console.log(this.adminList)
    },
    // 改变复选框
    change (index, z,item) {
      var count = item.list.length
      if (z === true) {
        this.adminList.splice(1, 0, index)
        if (item.list.filter(subItem => {
          return subItem.is == true
        }).length == count){
          item.checked = true
        }
        // console.log(this.adminList)
      } else {
        this.adminList = this.adminList.filter(value => {
          return value !== index
        })
        item.checked = false
        // console.log(this.adminList)
      }
    },
    allChange(list, z) {
      var ids = list.map(item => item.id)
      if (z === true) {
        this.adminList = this.adminList.filter(value => {
          return ids.indexOf(value) == -1
        }).concat(ids)
        list.map(item => {
            item.is = true
            return item
      })
      //console.log(this.adminList)
      } else {
        this.adminList = this.adminList.filter(value => {
          return ids.indexOf(value) == -1
        })
        list.map(item => {
            item.is = false
            return item
      })

      //console.log(this.adminList)
      }
    },
    // 提交
    async submitForm () {
      //console.log(this.adminList)
      const res = await this.$http.post('/user/sq', {
        list: this.adminList,
        userId: this.obj.id,
        token: window.sessionStorage.getItem('token')
      })
      if (res.status !== 200 || res.data !== true) return this.$message.error('设置失败')
      this.$message.success('授权成功')
      this.submit()
    }
  }
}
</script>

<style lang="less" scoped>
h2 {
  margin-bottom: 20px;
}
.admin {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
}
.left {
  width: 300px;
  border: 1px solid #ccc;
  padding: 0 10px;
  margin-right: 20px;
  div {
    height: 50px;
    line-height: 50px;
  }
  label {
    display: inline-block;
    width: 100px;
  }
  span {
    color: blue;
  }
}
.right {
  ul {
    overflow: hidden;
  }
  li {
    float: left;
    .el-checkbox {
      margin-right: 7px;
    }
    span {
      margin-right: 20px;
    }
  }
}
</style>
