<template>
  <div>
    <main>
      <h1>{{formAligm.name}}</h1>
      <div v-html="formAligm.content"></div>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formAligm: {}
    }
  },
  methods: {
    async getCurriculum () {
      const { data: res } = await this.$http.post('/user/getCourse', {
        id: this.$route.query.id
      })
      this.formAligm = res
    }
  },
  created () {
    this.getCurriculum()
  }
}
</script>

<style lang="less" scoped>
main {
  width: 1000px;
  margin: 0 auto;
  padding: 30px 0;
  h1 {
    text-align: center;
    letter-spacing: 2px;
  }
}
</style>
