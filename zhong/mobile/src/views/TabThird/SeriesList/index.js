import React from 'react'
import url from 'url'
import axios from '../../../untils/axios'
// 组件库
import { Tabs } from 'antd-mobile'
// 样式
import styles from './index.module.css'

const tabs = [
  { title: '在售' },
  { title: '停售' }
]

export default class SeriesList extends React.Component {
  state = {
    seriesList: [],
    id: url.parse(this.props.location.search, true).query.id
  }
  componentDidMount () {
    // 获取车系列表
    this.getSeriesList()
  }
  // 获取车系列表
  async getSeriesList () {
    const { data: res } = await axios.post('/car/series', {
      brand: this.state.id
    })
    this.setState({ seriesList: res })
  }
  render () {
    return (
      <Tabs tabs={tabs} initialPage={0} animated={true} useOnPan={false}>
        <div style={{height: '100%', backgroundColor: '#fff'}}>
          <h2 style={{backgroundColor: '#F3F3F3', color: '#969696', height: '35px', lineHeight: '35px', fontSize: '13px', fontWeight: '400', paddingLeft: '20px'}}>
            {this.state.id}
          </h2>
          <ul style={{backgroundColor: '#fff', padding: '20px 0 0 20px'}}>
            {
              this.state.seriesList.map(item => {
                return <li key={item.series} className={styles.item} onClick={() => this.props.history.push(`/serieslist/seriesdetails?id=${item.series}`)}>
                  <img src={`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/series/${item.series}.jpg`} style={{width: '30%', height: '30%'}} alt="" />
                  <div className={styles.items}>
                    <h2 style={{fontSize: '16px'}}>{item.series}</h2>
                    <div style={{margin: '10px 0', color: '#757575', fontSize: '12px'}}>指导价： {item.guidePrice}</div>
                    <div style={{color: '#757575', fontSize: '12px'}}>{item.level}</div>
                  </div>
                </li>
              })
            }
          </ul>
        </div>
        <div style={{height: '100%'}}>
        </div>
      </Tabs>
    )
  }
}
