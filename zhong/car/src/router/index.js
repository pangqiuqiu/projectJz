import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from 'js-cookie'

Vue.use(VueRouter)

const routes = [
  // 当访问的页面不存在时,重定向到首页
  {
    path: '*/',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  // 首页
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    children: [
      {
        path: '/home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Main.vue')
      },
      {
        path: '/specialsale/salelist',
        component: () => import(/* webpackChunkName: "home" */ '../views/specialSale/SaleList.vue')
      },
      {
        path: '/forum/forumtitle',
        component: () => import(/* webpackChunkName: "home" */ '../views/forum/ForumTitle.vue')
      },
      {
        path: '/forum/post/list',
        component: () => import(/* webpackChunkName: "home" */ '../views/forum/post/List.vue')
      },
      {
        path: '/picture/homepic',
        component: () => import(/* webpackChunkName: "home" */ '../views/picture/HomePic')
      },
      {
        path: '/distr/offer',
        component: () => import(/* webpackChunkName: "home" */ '../views/distributor/Offer.vue')
      },
      {
        path: '/distr/distributor',
        component: () => import(/* webpackChunkName: "home" */ '../views/distributor/Distributor.vue')
      },
      {
        path: '/picture/autoshow',
        component: () => import(/* webpackChunkName: "pic" */ '../views/picture/AutoShow.vue')
      }
    ]
  },
  // 分站
  {
    path: '/substation/home',
    component: () => import(/* webpackChunkName: "advertisement" */ '../views/substation/Home')
  },
  // 广告
  {
    path: '/advertisement/anhui',
    component: () => import(/* webpackChunkName: "advertisement" */ '../views/advertisement/Home')
  },
  {
    path: '/advertisement/wenzhou',
    component: () => import(/* webpackChunkName: "advertisement" */ '../views/advertisement/About')
  },
  {
    path: '/advertisement/nanchang',
    component: () => import(/* webpackChunkName: "advertisement" */ '../views/advertisement/Index')
  },
  // 登录系列
  {
    path: '/login/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
  },
  {
    path: '/login/register',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Register.vue')
  },
  {
    path: '/login/retrieve',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Retrieve.vue')
  },
  // 汽车系列
  {
    path: '/automobile/details',
    component: () => import(/* webpackChunkName: "automobile" */ '../views/automobile/Details.vue'),
    redirect: '/automobile/details/detailsHome',
    children: [
      {
        path: '/automobile/details/detailsHome',
        component: () => import(/* webpackChunkName: "automobile" */ '../views/automobile/DetailsHome.vue')
      },
      {
        path: '/automobile/details/ParameterConfiguration',
        component: () => import(/* webpackChunkName: "automobile" */ '../views/automobile/ParameterConfiguration.vue')
      },
      {
        path: '/automobile/details/video',
        component: () => import(/* webpackChunkName: "automobile" */ '../views/automobile/Video.vue')
      }
    ]
  },
  // 今日特卖
  {
    path: '/specialsale/saledetails',
    component: () => import(/* webpackChunkName: "specialsale" */ '../views/specialSale/SaleDetails.vue')
  },
  // 论坛专区
  {
    path: '/forum/post/release',
    component: () => import(/* webpackChunkName: "specialsale" */ '../views/forum/post/Release.vue')
  },
  {
    path: '/forum/post/details',
    component: () => import(/* webpackChunkName: "specialsale" */ '../views/forum/post/Details.vue')
  },
  // 图片专区
  {
    path: '/picture/home',
    component: () => import(/* webpackChunkName: "pic" */ '../views/picture/Home.vue'),
    redirect: '/picture/realshooting',
    children: [
      {
        path: '/picture/vr',
        component: () => import(/* webpackChunkName: "pic" */ '../views/picture/VR.vue')
      },
      {
        path: '/picture/selected',
        component: () => import(/* webpackChunkName: "pic" */ '../views/picture/Selected.vue')
      },
      {
        path: '/picture/graphic',
        component: () => import(/* webpackChunkName: "pic" */ '../views/picture/Graphic.vue')
      },
      {
        path: '/picture/detailedexplanation',
        component: () => import(/* webpackChunkName: "pic" */ '../views/picture/DetailedExplanation.vue')
      },
      {
        path: '/picture/realshooting',
        component: () => import(/* webpackChunkName: "pic" */ '../views/picture/RealShooting.vue')
      }
    ]
  },
  // 视频
  {
    path: '/video/home',
    component: () => import(/* webpackChunkName: "home" */ '../views/video/Home.vue'),
    redirect: '/video/main',
    children: [
      {
        path: '/video/main',
        component: () => import(/* webpackChunkName: "home" */ '../views/video/Main.vue')
      },
      {
        path: '/video/original',
        component: () => import(/* webpackChunkName: "home" */ '../views/video/Original.vue')
      },
      {
        path: '/video/newcar',
        component: () => import(/* webpackChunkName: "home" */ '../views/video/NewCar.vue')
      },
      {
        path: '/video/autoshow',
        component: () => import(/* webpackChunkName: "home" */ '../views/video/AutoShow.vue')
      },
      {
        path: '/video/technology',
        component: () => import(/* webpackChunkName: "home" */ '../views/video/Technology.vue')
      },
      {
        path: '/video/testdrive',
        component: () => import(/* webpackChunkName: "home" */ '../views/video/TestDrive.vue')
      }
    ]
  },
  {
    path: '/video/details',
    component: () => import(/* webpackChunkName: "home" */ '../views/video/Details.vue')
  },
  // 店铺
  {
    path: '/distr/main',
    component: () => import(/* webpackChunkName: "distr" */ '../views/distributor/Main.vue'),
    redirect: '/distr/shophome',
    children: [
      {
        path: '/distr/shophome',
        component: () => import(/* webpackChunkName: "distr" */ '../views/distributor/ShopHome.vue')
      },
      {
        path: '/distr/contactus',
        component: () => import(/* webpackChunkName: "distr" */ '../views/distributor/ContactUs.vue')
      },
      {
        path: '/distr/exhibitionhall',
        component: () => import(/* webpackChunkName: "distr" */ '../views/distributor/ExhibitionHall.vue')
      },
      // {
      //   path: '/distr/promotiondetails',
      //   component: () => import(/* webpackChunkName: "distr" */ '../views/distributor/PromotionDetails.vue')
      // },
      {
        path: '/distr/infor',
        component: () => import(/* webpackChunkName: "distr" */ '../views/distributor/Infor.vue')
      }
    ]
  },
  // 汽车资讯 车讯
  {
    path: '/automotivelnformation/home',
    component: () => import(/* webpackChunkName: "automotivelnformation" */ '../views/automotivelnformation/Home.vue'),
    redirect: '/automotivelnformation/carnews',
    children: [
      {
        path: '/automotivelnformation/carnews',
        component: () => import(/* webpackChunkName: "automotivelnformation" */ '../views/automotivelnformation/CarNews.vue')
      },
      {
        path: '/automotivelnformation/testdrive',
        component: () => import(/* webpackChunkName: "automotivelnformation" */ '../views/automotivelnformation/TestDrive.vue')
      },
      {
        path: '/automotivelnformation/shoppingguide',
        component: () => import(/* webpackChunkName: "automotivelnformation" */ '../views/automotivelnformation/ShoppingGuide.vue')
      },
      {
        path: '/automotivelnformation/technology',
        component: () => import(/* webpackChunkName: "automotivelnformation" */ '../views/automotivelnformation/Technology.vue')
      },
      {
        path: '/automotivelnformation/culture',
        component: () => import(/* webpackChunkName: "automotivelnformation" */ '../views/automotivelnformation/Culture.vue')
      }
    ]
  },
  {
    path: '/automotivelnformation/details',
    component: () => import(/* webpackChunkName: "automotivelnformation" */ '../views/automotivelnformation/Details.vue')
  },
  // 用户
  {
    path: '/user/home',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/Home.vue'),
    redirect: '/user/data',
    children: [
      {
        path: '/user/data',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/Data.vue')
      },
      {
        path: '/user/forum',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/Forum.vue')
      },
      {
        path: '/user/media',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/Media')
      },
      {
        path: '/user/zhongedit',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/ZhongEdit')
      },
      {
        path: '/user/edit',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/Edit.vue')
      },
      {
        path: '/user/follow',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/Follow')
      },
      {
        path: '/user/collection',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/Collection')
      },
      {
        path: '/user/system',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/System')
      }
    ]
  },
  // 自媒体
  {
    path: '/media/title',
    component: () => import(/* webpackChunkName: "media" */ '../views/media/Title.vue'),
    redirect: '/media/home',
    children: [
      {
        path: '/media/home',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/Home.vue')
      },
      {
        path: '/media/selected',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/Selected.vue')
      },
      {
        path: '/media/bigguy',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/Bigguy.vue')
      },
      {
        path: '/media/manual',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/Manual.vue')
      },
      {
        path: '/media/technical',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/Technical.vue')
      },
      {
        path: '/media/expert',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/Expert.vue')
      },
      {
        path: '/media/analysis',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/Analysis.vue')
      },
      {
        path: '/media/travel',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/Travel.vue')
      },
      {
        path: '/media/energy',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/Energy.vue')
      },
      {
        path: '/media/focusing',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/Focusing.vue')
      },
      {
        path: '/media/culture',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/Culture.vue')
      },
      {
        path: '/media/autoshow',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/Autoshow.vue')
      },
      {
        path: '/media/all',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/All.vue')
      },
      {
        path: '/media/settledin',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/SettledIn')
      },
      // 排行榜
      {
        path: '/media/ranking',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/Ranking')
      },
      {
        path: '/media/user',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/User')
      },
      // 详情
      {
        path: '/media/details/video',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/details/Video')
      },
      {
        path: '/media/details/infor',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/details/Infor')
      },
      // 编辑
      {
        path: '/media/edit/infor',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/edit/Infor')
      },
      {
        path: '/media/edit/video',
        component: () => import(/* webpackChunkName: "media" */ '../views/media/edit/Video')
      }
    ]
  },
  // 联系我们
  {
    path: '/us/home',
    component: () => import(/* webpackChunkName: "us" */ '../views/us/Home'),
    redirect: '/us/about',
    children: [
      {
        path: '/us/about',
        component: () => import(/* webpackChunkName: "us" */ '../views/us/About')
      },
      {
        path: '/us/contact',
        component: () => import(/* webpackChunkName: "us" */ '../views/us/Contact')
      },
      {
        path: '/us/privacy',
        component: () => import(/* webpackChunkName: "us" */ '../views/us/Privacy')
      },
      {
        path: '/us/join',
        component: () => import(/* webpackChunkName: "us" */ '../views/us/Join')
      },
      {
        path: '/us/tutor',
        component: () => import(/* webpackChunkName: "us" */ '../views/us/Tutor')
      }
    ]
  },
  // 详情
  {
    path: '/curriculum',
    component: () => import(/* webpackChunkName: "us" */ '../views/us/details/Curriculum')
  },
  {
    path: '/case',
    component: () => import(/* webpackChunkName: "us" */ '../views/us/details/Case')
  },
  {
    path: '/teacher',
    component: () => import(/* webpackChunkName: "us" */ '../views/us/details/Teacher')
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

// 路由拦截
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行 next('/login') 强制跳转
  if ((!Cookie.get('ID') || !Cookie.get('token')) && to.path === '/media/settledin') return next('/login/login')
  next()
})

export default router
