import React, { useState, useEffect } from 'react'
import { InputItem, List, Button, Toast } from 'antd-mobile'
import styles from './index.module.css'
import url from 'url'
import axios from '../../../untils/axios'

// 手机号正则
const ISMOBILE = /^[1][3,4,5,7,8,9][0-9]{9}$/

const Gathering = (props) => {
  // 页面数据
  const [obj, setObj] = useState({})
  // 用户报名信息
  const [user, setUser] = useState({name: '', phone: '', code: '', id: url.parse(props.location.search, true).query.id})
  // 获取页面信息
  useEffect(() => {
    // 获取数据
    const getLists = async () => {
      // 授权登录
      const { data: res } = await axios.post('/gather/getGather', { id: user.id })
      setObj(res)
    }
    getLists()
  }, [])

  // 获取验证码
  const code = async () => {
    if (!ISMOBILE.test(user.phone)) return Toast.fail('请输入正确的手机号', 2)
    await axios.post('/user/sendCode', user)
  }
  // 报名参与
  const submit = async () => {
    if (!ISMOBILE.test(user.phone) || !user.name || !(/^\d{4}$/.test(user.code))) return Toast.fail('请将信息填写完整', 2)
    // 短信验证
    const { data: rew } = await axios.post('/user/yzCode', user)
    if (!rew) return Toast.fail('手机验证码错误', 2)
    const u = JSON.stringify(user)
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx24ef6027f6157468&redirect_uri=https://www.zhongdianqiche.com/mobile/%23/pay/${u}&response_type=code&scope=snsapi_base&state=128#wechat_redirect`
  }

  return (
    <div>
      {/* 封面图 */}
      <img style={{width: '100%'}} src={obj.coverPic} alt="重点汽车"></img>
      {/* 活动标题 */}
      <div className={styles.title}>
        <img src={obj.logo} alt="重点汽车" style={{width: '100px', height: '100px'}} />
        <h2>{obj.name}</h2>
      </div>
      <div className={styles.main}>
        {/* 活动金额和礼品 */}
        <div>
          <h3>诚意金: <span>{obj.price}元</span></h3>
          <h3>活动奖品: <span>{obj.gift}</span></h3>
        </div>
        {/* 活动保障 */}
        <ul>
          {
            obj.ensureList ? obj.ensureList.map(item => {
              return <li key={item}>{item}</li>
            }): ''
          }
        </ul>
      </div>
      {/* 活动详情 */}
      <div className={styles.details}>
        <h3>活动详情</h3>
        <div dangerouslySetInnerHTML={{__html: obj.details}}></div>
      </div>
      {/* 活动报名 */}
      <div style={{backgroundColor: '#fff', marginTop: '15px'}} className={styles.signUp}>
        <h3>活动报名(需支付诚意金<span>￥{obj.price}</span>元)</h3>
        <div className={styles.item}>
          <span>活动4S店：</span>
          <i>{obj.dealer ? obj.dealer['name4s'] : ''}</i>
        </div>
        <div className={styles.item}>
          <span>活动开始时间：</span>
          <i>{obj.startDate}</i>
        </div>
        <div className={styles.item}>
          <span>活动结束时间：</span>
          <i>{obj.endDate}</i>
        </div>
        <List className={styles.form}>
          <InputItem placeholder="请输入您的姓名" value={user.name} onChange={v => setUser({...user, name: v})}>姓名</InputItem>
          <InputItem placeholder="请输入手机号" value={user.phone} onChange={v => setUser({...user, phone: v})}>手机号码</InputItem>
          <InputItem placeholder="请输入验证码" value={user.code} onChange={v => setUser({...user, code: v})}>验证码</InputItem>
          <div className={styles.btn}>
            <Button size="small" style={{width: '150px'}} type="primary" onClick={code}>获取验证码</Button>
            <Button size="small" style={{width: '150px'}} type="warning" onClick={submit}>立即报名</Button>
          </div>
        </List>
      </div>
      {/* 活动流程 */}
      <div className={styles.process}>
        <h3 style={{padding: '10px'}}>活动流程</h3>
        <div>
          <img style={{width: '100%'}} src={require('../../../assets/activity/1.png')} alt="重点汽车" />
        </div>
        <div className={styles.top}>
          <div>联系电话: {obj.phone}</div>
          <div>活动4S店: {obj.dealer ? obj.dealer['name4s'] : ''}</div>
        </div>
        <div className={styles.bottom}>
          本活动有经销商组织并负责，活动详细请咨询经销商，重点汽车网仅提供技术支持
        </div>
      </div>
    </div>
  )
}

export default Gathering