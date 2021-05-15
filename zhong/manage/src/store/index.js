import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: []
  },
  mutations: {
    setMenu (state, val) {
      state.menu = val
      localStorage.setItem('menu', JSON.stringify(val))
    },
    clearMenu (state) {
      state.menu = []
      localStorage.clear('menu')
    },
    addMenu (state, router) {
      if (!localStorage.getItem('menu')) return
      const menu = JSON.parse(localStorage.getItem('menu'))
      state.menu = menu
      const currentMenu = [
        {
          path: '/',
          component: () => import('@/views/Home.vue'),
          children: []
        }
      ]
      menu.forEach(item => {
        if (item.list) {
          item.list = item.list.map(item => {
            item.component = resolve => require([`@/views/${item.url}`], resolve)
            return item
          })
          currentMenu[0].children.push(...item.list)
        } else {
          item.component = resolve => require([`@/views/${item.url}`], resolve)
          currentMenu[0].children.push(item)
        }
      })
      router.addRoutes(currentMenu)
    }
  }
})
