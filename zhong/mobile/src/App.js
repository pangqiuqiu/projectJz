import React, { lazy, Suspense } from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
// 页面
import Tab from './views/Tab'
// 详情
const VideoDetails = lazy(() => import('./views/Details/Video'))
const InforDetails = lazy(() => import('./views/Details/Infor'))
// 车型库
const SeriesList = lazy(() => import('./views/TabThird/SeriesList'))
const SeriesDetails = lazy(() => import('./views/TabThird/SeriesDetails'))
// 车型库 icon
const Distributor = lazy(() => import('./views/TabThird/Icon/Distributor'))
const Navigation = lazy(() => import('./views/TabThird/Icon/Navigation'))
const CarType = lazy(() => import('./views/TabThird/Icon/Cartype'))
const Parameter = lazy(() => import('./views/TabThird/Icon/Parameter'))
const Picture = lazy(() => import('./views/TabThird/Icon/Picture'))
// 特卖
const Myform = lazy(() => import('./views/TabFourth/Myform'))
// 第三方活动
// 集客活动
const Gathering = lazy(() => import('./views/Activity/Gathering'))
const Pay = lazy(() => import('./views/Activity/Pay'))
// 后台
const ManageLogin = lazy(() => import('./views/Manage/Login'))
const ManageCustomer = lazy(() => import('./views/Manage/Customer'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div style={{paddingTop: '100px', textAlign: 'center'}}>loading...</div>}>
        <div className="App">
          <Route path="/" exact render={() => <Redirect to="/tab"></Redirect>}></Route>
          <Route path="/tab" component={Tab}></Route>
          <Route path="/video_details" component={VideoDetails}></Route>
          <Route path="/infor_details" component={InforDetails}></Route>
          <Route path="/library/serieslist" component={SeriesList}></Route>
          <Route path="/serieslist/seriesdetails" component={SeriesDetails}></Route>
          <Route path="/icon/distributor" component={Distributor}></Route>
          <Route path="/icon/cartype" component={CarType}></Route>
          <Route path="/icon/parameter" component={Parameter}></Route>
          <Route path='/icon/picture' component={Picture}></Route>
          <Route path="/icon/navigation" component={Navigation}></Route>
          <Route path="/specialist/myform" component={Myform}></Route>
          <Route path="/gathering" component={Gathering}></Route>
          <Route path="/pay/:u" component={Pay}></Route>
          <Route path="/manage/login" component={ManageLogin}></Route>
          <Route path='/manage/customer/:token' component={ManageCustomer}></Route>
        </div>
      </Suspense>
    </Router>
  )
}

export default App
