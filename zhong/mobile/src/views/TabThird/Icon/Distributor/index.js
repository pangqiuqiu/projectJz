import React from 'react'
import url from 'url'
import axios from '../../../../untils/axios'
// 样式
import addressIcon from '../../../../assets/distor/didian .png'
import styles from './index.module.css'

export default class Distributor extends React.Component {
  state = {
    id: url.parse(this.props.location.search, true).query.id,
    city: sessionStorage.getItem('city'),
    distributorList: []
  }
  componentDidMount () {
    this.getDistributorList()
  }
  // 获取经销商列表
  async getDistributorList () {
    const { data: res } = await axios.post('/dealer/dealerList', {
      city: this.state.city,
      series: this.state.id
    })
    this.setState({ distributorList: res })
  }
  // 拨打电话
  handleTel (tel) {
    window.location.href = `tel: ${tel}`
  }
  render () {
    return (
      <div>
        <header className={styles.header}>
          <label style={{fontSize: '15px'}}>经销商</label>
          <span style={{fontSize: '12px'}}>{this.state.city}</span>
        </header>
        <ul>
          {
            this.state.distributorList.map(item => {
              return <li key={item.id} className={styles.item}>
                <h2 style={{fontSize: '15px'}}>{item.name4s}</h2>
                <div style={{padding: '0 20px 10px 20px'}}>
                  <img src={addressIcon} style={{width: '20px', height: '20px', verticalAlign: 'middle'}} alt="" />
                  <span className={styles.address}>{item.address}</span>
                </div>
                <div className={styles.btn}>
                  <span className={styles.phone} onClick={this.handleTel.bind(this, item.tel)}>拨打电话</span>
                  <span onClick={() => this.props.history.push(`/icon/navigation?address=${item.address}`)}>导航去这</span>
                </div>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}