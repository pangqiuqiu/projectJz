<template>
  <div>
    <h3>我的论坛</h3>
    <div class="title">
      <div>
        <label>发帖数:</label>
        <span>{{this.obj.tz}}</span>
      </div>
      <div>
        <label>回帖数:</label>
        <span>{{this.obj.ht}}</span>
      </div>
      <div>
        <label>精华帖:</label>
        <span>{{this.obj.jht}}</span>
      </div>
    </div>
    <!-- tab栏 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="我的帖子" name="first">
        <h3 v-show="!count1">暂无发表帖子</h3>
        <MyForum @myPost="myPost" v-show="count1"></MyForum>
      </el-tab-pane>
      <el-tab-pane label="我的回帖" name="second">
        <h3 v-show="!count2">暂无回复的帖子</h3>
        <MyReply @myReply="myReply" v-show="count2"></MyReply>
      </el-tab-pane>
      <el-tab-pane label="我的精华帖" name="third">
        <h3 v-show="!count3">暂无精华帖</h3>
        <MyEssences @myEssences="myEssences" v-show="count3"></MyEssences>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import MyForum from '../../components/user/MyForum'
import MyReply from '../../components/user/MyReply'
import MyEssences from '../../components/user/MyEssences'
const ID = Cookie.get('ID')
export default {
  components: {
    MyForum,
    MyEssences,
    MyReply
  },
  data () {
    return {
      // 数目
      obj: {
        tz: '',
        jht: '',
        ht: ''
      },
      // tab默认值
      activeName: 'first',
      // 是否隐藏
      count1: false,
      count2: false,
      count3: false
    }
  },
  methods: {
    // 帖子数量
    async getCount () {
      const { data: res } = await this.$http.post('/Invit/Count', {
        userId: ID
      })
      this.obj = res
    },
    // 判断显示与隐藏
    myPost (data) {
      if (data !== 0) {
        this.count1 = true
      }
    },
    myReply (data) {
      if (data !== 0) {
        this.count2 = true
      }
    },
    myEssences (data) {
      if (data !== 0) {
        this.count3 = true
      }
    }
  },
  created () {
    this.getCount()
  }
}
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
  div {
    margin-right: 30px;
    font-size: 14px;
    color: #aaa;
    label {
      margin-right: 5px;
    }
  }
}
</style>
