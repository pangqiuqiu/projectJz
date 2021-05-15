import React from 'react'
import url from 'url'
import axios from '../../../../untils/axios'
// 样式
import styles from './index.module.css'

export default class Parameter extends React.Component {
  state = {
    id: url.parse(this.props.location.search, true).query.id,
    typeObj: {},
    o: {},
    op: {}
  }
  componentDidMount () {
    // 获取参数配置
    this.getParameter()
  }
  // 获取参数配置
  async getParameter () {
    const { data: res } = await axios.post('/car/config', {
      id: this.state.id
    })
    this.setState({typeObj: res, o: res.o, op: res.op })
  }
  render () {
    return (
      <div>
        {/* 车型 */}
        <h2 style={{padding: '15px', backgroundColor: '#fff', margin: '0', fontWeight: '400'}}>{this.state.typeObj.c}</h2>
        {/* 参数配置 */}
        <ul className={styles.list}>
          {
            Object.keys(this.state.o).map(key => (
              <li key={key}>
                <span style={{minWidth: '100px'}}>{key}</span>
                <span>{this.state.o[key]}</span>  
              </li>
            ))
          }
          {
            Object.keys(this.state.op).map(key => (
              <li key={key}>
                <span style={{minWidth: '100px'}}>{key}</span>
                <span>{this.state.op[key]}</span>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}