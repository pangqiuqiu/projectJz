<template>
  <div id="app">
    <InformationMain :title="title" :adv="adv"></InformationMain>
  </div>
</template>

<script>
import InformationMain from '../../components/InformationMain.vue'
export default {
  components: {
    InformationMain
  },
  data () {
    return {
      title: '导购',
      adv: '导购焦点图'
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
