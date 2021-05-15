<template>
  <div>
    <main>
      <div v-html="formAlign.content"></div>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formAlign: {
      }
    }
  },
  methods: {
    async getCase () {
      const { data: res } = await this.$http.post('/user/getCase', {
        id: this.$route.query.id
      })
      this.formAlign = res
    }
  },
  created () {
    this.getCase()
  }
}
</script>

<style lang="less" scoped>
main {
  padding: 30px 0;
  margin: 0 auto;
  width: 1000px;
}
</style>
