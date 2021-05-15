<template>
  <div>
    <List :title="title"></List>
  </div>
</template>

<script>
import List from '../../components/video/List'
export default {
  components: {
    List
  },
  data () {
    return {
      title: '试驾视频'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
