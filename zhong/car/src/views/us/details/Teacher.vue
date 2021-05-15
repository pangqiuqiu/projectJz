<template>
  <div class="app">
    <main>
      <img :src="formAlign.formalPhoto" alt="">
      <div>
        <h3>严智慧</h3>
        <p>{{formAlign.intro}}</p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formAlign: {}
    }
  },
  methods: {
    async getTeacher () {
      const { data: res } = await this.$http.post('/user/getTeachers', {
        id: this.$route.query.id
      })
      this.formAlign = res
    }
  },
  created () {
    this.getTeacher()
  }
  // mounted () {
  //   document.querySelector('body').setAttribute('style', 'background-color: #f5f5f5')
  // },
  // beforeDestroy () {
  //   document.querySelector('body').removeAttribute('style')
  // }
}
</script>

<style lang="less" scoped>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
main {
  display: flex;
  justify-content: flex-start;
  background: linear-gradient(23deg, #00ACFF 0%, #008AFF 100%);
  box-sizing: border-box;
  padding: 72.5px 30px;
  height: 520px;
  width: 750px;
  img {
    width: 180px;
    height: 375px;
    margin-right: 30px;
  }
  h3 {
    font-size: 25px;
    color: #fff;
    margin-bottom: 20px;
  }
  p {
    color: #fff;
    font-size: 21px;
    letter-spacing: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 11;
  }
}
</style>
