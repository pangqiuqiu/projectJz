<template>
  <div>
    <h3>我的收藏</h3>
    <ul>
      <li v-for="(item,index) in titleList" :key="item" @click="changeTitle(item,index)">
        <span :class="currentIndex === index ? 'select' : ''">{{item}} : </span>
        <span>{{myNum[index]}}</span>
      </li>
    </ul>
    <!-- 表格 -->
    <MyInfor v-show="this.current === '文章'"></MyInfor>
    <MyVideo v-show="this.current === '视频'"></MyVideo>
    <!-- <MyPost v-show="this.current === '帖子'"></MyPost> -->
  </div>
</template>

<script>
import MyInfor from '../../components/user/MyInfor'
import MyVideo from '../../components/user/MyVideo'
// import MyPost from '../../components/user/MyPost'
import Cookie from 'js-cookie'
export default {
  components: {
    MyInfor,
    // MyPost,
    MyVideo
  },
  data () {
    return {
      // 标题数组
      titleList: ['文章', '视频'],
      currentIndex: 0,
      current: '文章',
      // 关注数量
      myNum: []
    }
  },
  methods: {
    // 获取收藏个数
    async getNum () {
      const { data: res } = await this.$http.post('/user/showCount', {
        userId: Cookie.get('ID')
      })
      this.myNum = res
    },
    // 切换标题
    changeTitle (item, index) {
      this.currentIndex = index
      this.current = item
    }
  },
  created () {
    // 获取收藏个数
    this.getNum()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 20px;
}

.select {
  border-bottom: 2px solid #2B77FF;
}

ul {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  li {
    margin-right: 50px;
    cursor: pointer;
    :first-child {
      display: inline-block;
      padding-bottom: 5px;
    }
    :last-child {
      color: #2B77FF;
    }
  }
}
</style>
