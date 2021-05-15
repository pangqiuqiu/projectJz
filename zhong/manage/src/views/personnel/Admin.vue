<template>
  <div>
    <h3>{{this.title}}</h3>
    <!-- 员工基本信息 -->
    <h5 v-if="title === '新增员工'">员工基本信息</h5>
    <el-form :model="addUserForm" :inline="true" v-if="title === '新增员工'">
      <el-form-item label="员工姓名">
        <el-input v-model="addUserForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="addUserForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-select v-model="addUserForm.role" placeholder="请选择">
          <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="线索分配比例">
        <el-input v-model="addUserForm.phone" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <!-- 授权 -->
    <h5 style="color: red">员工权限</h5>
    <div v-for="item in admin" :key="item.token" class="admin">
      <h5>{{item.token}}</h5>
      <ul>
        <li v-for="items in item.list" :key="items.id">
          <el-checkbox :label="items.name" @change="change(items.id, items.is,item)" v-model="items.is"></el-checkbox>
        </li>
        <el-checkbox :label="item.ckName" @change="allChange(item.list,item.checked)" v-model="item.checked"></el-checkbox>
      </ul>
    </div>
    <!-- 按钮 -->
    <el-button style="width: 700px" type="success" @click="addUserSubmission">{{title === '新增员工' ? '确认增加' : '确认修改'}}</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 页面标题
      title: '',
      // 员工基本信息
      addUserForm: {
        userId: '', // 用户ID
        name: '',
        phone: '',
        role: '', // 职位
        list: [] // 权限
      },
      // 员工职位
      options: [],
      // 权限列表
      admin: [],
      // 发送后台的ID数据
      adminList: []
    }
  },
  methods: {
    // 判断是新增员工还是修改员工
    getFlag () {
      const data = JSON.parse(this.$Base64.decode(this.$route.query.key))
      // 有title则表示新增员工
      if (data.title) {
        this.title = '新增员工'
      } else { // 修改员工
        this.title = '修改员工信息'
        this.addUserForm.userId = data.id
      }
      // 获取权限列表
      this.getAdmin()
    },
    // 员工职位
    async getStaffWork () {
      const { data: res } = await this.$http.post('/user/role')
      this.options = res
    },

    // 获取权限列表
    async getAdmin () {
      const { data: rew } = await this.$http.post('/user/userQx', {
        userId: this.addUserForm.userId
      })
      this.admin = rew
      //每个栏目增加全选 2021-3-9 zy
      this.admin.map(item => {
            item.checked = true
            item.ckName = "全选"
            return item
      })
      // 获取数组中已有权限
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
      } else {
        this.adminList = this.adminList.filter(value => value !== index)
        item.checked = false
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
    // 新增员工/修改员工
    async addUserSubmission () {
      if (this.title === '新增员工') {
        if (this.addUserForm.name.trim() === '') return this.$message.error('请输入员工姓名')
        if (!(/^1[3456789]\d{9}$/.test(this.addUserForm.phone))) return this.$message.error('请输入正确的手机号')
      }
      this.addUserForm.list = this.adminList
      const res = await this.$http.post('/user/addUser', this.addUserForm)
      if (res.status !== 200 || res.data !== true) return this.$message.error('操作失败')
      this.$message.success('操作成功')
      this.$router.go(-1)
    }
  },
  created () {
    // 判断是新增员工还是修改员工
    this.getFlag()
    // 获取员工职位
    this.getStaffWork()
  }
}
</script>

<style scoped lang="less">
h5 {
  margin: 20px 0;
}
.el-form {
  .el-input, .el-select {
    width: 200px;
  }
}
.admin {
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
