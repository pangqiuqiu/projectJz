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
      title: '试驾评测',
      adv: '试驾评测焦点图'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
