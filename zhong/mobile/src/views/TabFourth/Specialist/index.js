import React from 'react'
import axios from '../../../untils/axios'
// 组件
import { Toast } from 'antd-mobile'
import styles from './index.module.css'

export default class Specialist extends React.Component {
  constructor () {
    super()
    this.state = {
      city: window.sessionStorage.getItem('city'),
      headList: [], // 推荐
      speciList: [], // 特卖
      // 当前项
      current: '',
      // 用户选择车系
      series: '',
      // 车系索引
      seriesIndex: 0,
      seriesIndexList: [] // 构建一个品牌被选中项的数组
    }
  }
  componentDidMount () {
    // 获取推荐列表
    this.getHeadList()
    // 特卖列表
    this.getSpeciList()
  }
  // 获取推荐列表
  async getHeadList () {
    const { data: res } = await axios.post('/sale/getTmBrand', {
      city: this.state.city
    })
    this.setState({ headList: res })
  }
  // 特卖列表
  async getSpeciList (brand) {
    const { data: res } = await axios.post('/sale/getTm', {
      city: this.state.city,
      brand: brand
    })
    this.setState({ speciList: res, seriesIndexList: new Array(res.length).fill(0) })
  }
  // 选择车系
  changeSeries (label, index1, index2) {
    // 更新数组中被选中项目
    let a = this.state.seriesIndexList
    a[index1] = index2
    this.setState({ series: label, current: label, seriesIndex: index2, seriesIndexList: a })
  }
  // 我要询价
  async btn (children) {
    const ary = children.filter(item => {
      return item.label === this.state.series
    })
    if (ary.length === 0) return Toast.fail('请选择相关车系', 1)
    this.props.history.push(`/specialist/myform?id=${this.state.series}`)
  }
  render () {
    return (
      <div style={{height: '100%', paddingBottom: '30px'}}>
        {/* 推荐列表 */}
        <ul className={styles.hobbyList}>
          <li onClick={() => this.getSpeciList()}>推荐</li>
          {
            this.state.headList.map(item => {
              return <li onClick={() => this.getSpeciList(item)} key={item}>{item}</li>
            })
          }
        </ul>
        {/* 特卖列表 */}
        <ul>
          {
            // this.state.speciList.map((item,index1) => {
            //   return <li key={item.label} style={{backgroundColor: '#fff', paddingBottom: '10px', marginBottom: '10px'}}>
            //     <h3 style={{height: '50px', lineHeight: '50px', padding: '0 15px'}}>{item.label}</h3>
            //     <div className={styles.item} style={{padding: '0 15px'}}>
            //       <div>
            //         {
            //           item.children.map((items,index2) => {
            //             return <div key={items.label}>
            //               <img alt="" src={items.pic} style={this.state.seriesIndex === index2 ? {width: '50px', height: '50px', marginRight: '10px'} : {display: 'none', width: '50px', height: '50px', marginRight: '10px'}} />
            //               <span style={this.state.current === items.label ? {backgroundColor: '#108ee9', borderColor: '#108ee9', color: '#fff'} : {}} onClick={this.changeSeries.bind(this, items.label, index2)} size="small" type="primary" inline="true">{items.label}</span>
            //             </div>
            //           })
            //         }
            //       </div>
            //     </div>
            //     <div style={{height: '1px', backgroundColor: '#eee', marginTop: '10px'}}></div>
            //     <div className={styles.btn} style={{width: '90px', height: '30px', backgroundColor: '#108ee9', color: '#fff', lineHeight: '30px', textAlign: 'center', marginRight: '15px', borderRadius: '3px'}} onClick={this.btn.bind(this, item.children)}>询价</div>
            //     <div style={{clear: 'both'}}></div>
            //   </li>
            // })
            this.state.speciList.map((item,index1) => {
              return <li key={item.label} style={{backgroundColor: '#fff', paddingBottom: '10px', marginBottom: '10px'}}>
                {/* 品牌标题 */}
                <h3 style={{height: '50px', lineHeight: '50px', padding: '0 15px'}}>{item.label}</h3>
                {/* 每个品牌的图片 */}
                <div className={styles.item} style={{padding: '0 15px'}}>
                  <img alt="" src={item.children[this.state.seriesIndexList[index1]].pic} />
                  <div className={styles.items}>
                    {
                      item.children.map((items,index2) => {
                        return <div key={items.label}>
                          <span style={this.state.current === items.label ? {backgroundColor: '#108ee9', borderColor: '#108ee9', color: '#fff'} : {}} onClick={this.changeSeries.bind(this, items.label, index1, index2)} inline="true">{items.label}</span>
                        </div>
                      })
                    }
                  </div>
                </div>
                <div style={{height: '1px', backgroundColor: '#eee', marginTop: '10px'}}></div>
                <div className={styles.btn} style={{width: '90px', height: '30px', backgroundColor: '#108ee9', color: '#fff', lineHeight: '30px', textAlign: 'center', marginRight: '15px', borderRadius: '3px'}} onClick={this.btn.bind(this, item.children)}>询价</div>
                <div style={{clear: 'both'}}></div>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}