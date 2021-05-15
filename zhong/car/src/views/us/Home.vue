<template>
  <div>
    <img src="../../assets/logo/logo.png" alt="" class="image" @click="back" v-if="currentIink !== '/us/tutor'">
    <ul>
      <li @click="change(index)" v-for="(item,index) in titleAry" :key="item.title" :class="currentIink === titleAry[index].link ? 'active' : ''">{{item.title}}</li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titleAry: [
        { title: '关于我们', link: '/us/about' },
        { title: '联系我们', link: '/us/contact' },
        { title: '隐私政策', link: '/us/privacy' },
        { title: '加入我们', link: '/us/join' },
        { title: '企业合作', link: '/us/tutor' }
      ],
      currentIndex: 0,
      currentIink: '/us/about'
    }
  },
  methods: {
    // 切换页面
    change (index) {
      this.currentIndex = index
      const link = this.titleAry[index].link
      this.$router.push(link)
    },
    // 回到首页
    back () {
      this.$router.push('/home')
    }
  },
  updated () {
    this.currentIink = this.$route.fullPath
  },
  created () {
    this.currentIink = this.$route.fullPath
  }
}
</script>

<style lang="less" scoped>
.image {
  position: absolute;
  top: 30px;
  left: 50px;
  cursor: pointer;
}
ul {
  display: flex;
  justify-content: flex-start;
  position: absolute;
  right: 200px;
  top: 30px;
  li {
    color: #ffffff;
    font-size: 14px;
    margin-right: 30px;
    font-weight: bold;
    padding-bottom: 5px;
    cursor: pointer;
  }
}
.active {
  border-bottom: 2px solid #ffffff;
}
</style>
