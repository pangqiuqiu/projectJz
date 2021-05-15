import React, { lazy } from 'react'
import { Route } from 'react-router-dom'
// 定位
import LocationCity from '../../components/LocationCity'
// 导入tabBar图片
import ImgHome1 from '../../assets/tabBar/home1.png'
import ImgHome2 from '../../assets/tabBar/home2.png'
import ImgPhone1 from '../../assets/tabBar/phone1.png'
import ImgPhone2 from '../../assets/tabBar/phone2.png'
import ImgCar1 from '../../assets/tabBar/car1.png'
import ImgCar2 from '../../assets/tabBar/car2.png'
import ImgJiemu1 from '../../assets/tabBar/jiemu1.png'
import ImgJiemu2 from '../../assets/tabBar/jiemu2.png'
import ImgTemai1 from '../../assets/tabBar/temai1.png'
import ImgTemai2 from '../../assets/tabBar/temai2.png'
// 导入组件
import { TabBar } from 'antd-mobile'
// 导入CSS样式
import './index.module.css'
// 导入子路由
const Home = lazy(() => import('../TabOne/Home'))
const Mobile = lazy(() => import('../Mobile'))
const Library = lazy(() => import('../TabThird/Library')) 
const Program = lazy(() => import('../TabSecond/Program'))
const Specialist = lazy(() => import('../TabFourth/Specialist'))
// 重构TabBar
const tabItems = [
  {
    title: '首页',
    icon: ImgHome1,
    selectIcon: ImgHome2,
    path: '/tab'
  },
  {
    title: '栏目',
    icon: ImgJiemu1,
    selectIcon: ImgJiemu2,
    path: '/tab/program'
  },
  {
    title: '车型库',
    icon: ImgCar1,
    selectIcon: ImgCar2,
    path: '/tab/library'
  },
  {
    title: '特卖',
    icon: ImgTemai1,
    selectIcon: ImgTemai2,
    path: '/tab/specialist'
  },
  {
    title: '客户端',
    icon: ImgPhone1,
    selectIcon: ImgPhone2,
    path: '/tab/mobile'
  }
]

class Tab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 默认选中的TabBar
      selectedTab: this.props.location.pathname
    }
  }
  componentDidUpdate (prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      // 此时路由发生了切换
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }
  // 渲染tabBar
  renderTabBar () {
    return tabItems.map(item => 
      <TabBar.Item
        title={item.title}
        key={item.title}
        icon={
          <img style={{width: '30px', height: '30px'}} alt="" src={item.icon}></img>
        }
        selectedIcon={<img style={{width: '30px', height: '30px'}} alt="" src={item.selectIcon}></img>}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.setState({
            selectedTab: item.path
          })
          // 实现路由切换
          this.props.history.push(item.path)
        }}
      />)
  }
  render () {
    return (
      <div className="tab">
        <LocationCity></LocationCity>
        <Route exact path="/tab" exact component={Home}></Route>
        <Route path="/tab/program" component={Program}></Route>
        <Route path="/tab/library" component={Library}></Route>
        <Route path="/tab/specialist" component={Specialist}></Route>
        <Route path="/tab/mobile" component={Mobile}></Route>
        {/* TabBar */}
        <TabBar
          onRenderContent={true}
          // 未选中字体颜色
          unselectedTintColor="#888"
          // 选中字体颜色
          tintColor="#2B79FF"
          barTintColor="white"
        >
          {this.renderTabBar()}
        </TabBar>
      </div>
    )
  }
}

export default Tab