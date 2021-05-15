<template>
  <div>
    <!-- 图片 -->
    <img src="../../assets/us/2.png" alt="">
    <!-- 介绍 -->
    <div class="w">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="item in list" :key="item.id" :name="item.id">
          <template slot="title">
            <h3>岗位名称: {{item.name}}</h3>
          </template>
          <div class="city">{{item.city}} {{item.type}} {{item.years}}</div>
          <ul style="margin-bottom: 20px">
            <div class="work">岗位职责</div>
            <li v-for="(items,index) in item.duty" :key="items">{{index + 1}}. {{items}}</li>
          </ul>
          <ul>
            <div class="work">任职要求</div>
            <li v-for="(items,index) in item.ask" :key="items">{{index + 1}}. {{items}}</li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: '',
      list: []
    }
  },
  created () {
    this.getJobList()
  },
  methods: {
    // 获取职位列表
    async getJobList () {
      const { data: res } = await this.$http.post('/user/job')
      this.list = res
    }
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1000px;
  margin: 0 auto;
}
.el-collapse {
  margin: 20px 0;
  .city {
    color: #999;
    font-size: 15px;
    margin-bottom: 30px;
  }
  .work {
    margin-bottom: 5px;
    font-size: 14px;
  }
}
</style>
