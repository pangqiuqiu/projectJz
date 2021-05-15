<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  watch: {
    '$route': function (to, form) {
      if (to.path === '/login/login' && form.path !== '/login/register') {
        if (form.query.id === undefined) {
          window.sessionStorage.setItem('page', form.path)
        } else {
          const page = `${form.path}?id=${form.query.id}`
          window.sessionStorage.setItem('page', page)
        }
      }
    }
  }
}
</script>

<style lang="less">
</style>
