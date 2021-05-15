import React from 'react'
import url from 'url'
// 组件
import DownloadApp from '../../../../components/DownloadApp'
// 样式
import styles from './index.module.css'
import axios from '../../../../untils/axios'

export default class CarType extends React.Component {
  state = {
    id: url.parse(this.props.location.search, true).query.id,
    // 年限
    allYear: [],
    years: '',
    currentIndex: 0,
    // 车型
    typeList: []
  }
  componentDidMount () {
    // 获取年限
    this.getYearList()
    // 获取车型列表
    this.getTypeList()
  }
  // 获取年限
  async getYearList () {
    const { data: res } = await axios.post('/car/years', {
      series: this.state.id
    })
    res.unshift('全部在售')
    this.setState({ allYear: res })
  }
  // 获取车型列表
  async getTypeList () {
    const { data: res } = await axios.post('/car/showCarType', {
      series: this.state.id,
      years: this.state.years 
    })
    this.setState({ typeList: res })
  }
  // 切换年限
  changeYear (item,index) {
    this.setState({ currentIndex: index, years: item }, () => {
      this.getTypeList()
    })
  }
  render () {
    return (
      <div style={{paddingTop: '80px'}}>
        {/* 下载APP */}
        <DownloadApp></DownloadApp>
        {/* 车型列表 */}
        <h2 style={{height: '45px', lineHeight: '45px', paddingLeft: '15px', fontSize: '15px'}}>车型列表</h2>
        {/* 全部在售 */}
        <ul className={styles.year}>
          {
            this.state.allYear.map((item,index) => {
              return <li onClick={() => {this.changeYear(item,index)}} style={this.state.currentIndex === index ? { "color": '#000', fontSize: '15px'} : {}} key={item}>{item}</li>
            })
          }
        </ul>
        {/* 车型列表 */}
        <ul className={styles.type}>
          {
            this.state.typeList.map(item => {
              return <li key={item.id}>
                <h3 style={{marginBottom: '15px', fontSize: '15px'}}>{item.type}</h3>
                <div style={{marginBottom: '10px'}}>
                  <span style={{color: '#9E9E9E', fontSize: '12px'}}>指导价: </span>
                  <span style={{color: '#000', fontWeight: '700', fontSize: '12px'}}> {item.guidePrice}万元</span>
                </div>
                <div className={styles.btn} onClick={() => this.props.history.push(`/icon/parameter?id=${item.id}`)} style={{color: '#2B79FF', textAlign: 'center', height: '50px', lineHeight: '50px'}}>查看配置</div>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}