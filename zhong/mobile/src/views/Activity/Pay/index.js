import React, { useEffect } from 'react'
import axios from '../../../untils/axios'
import { Toast } from 'antd-mobile'
import { wexinPay } from '../../../untils/wx'
import { useHistory } from 'react-router-dom'

const Pay = (props) => {
  const u = JSON.parse(props.match.params.u)
  const history = useHistory()
  const getPay = async () => {
    const { data: res } = await axios.post('/gather/addSign', { ...u, code: window.location.href, gatherId: u.id })
    wexinPay(
      {
        appId: res.appId,
        nonceStr: res.nonceStr,
        package: res.package,
        paySign: res.paySign,
        signType: res.signType,
        timeStamp: res.timeStamp
      },
      () => {
        Toast.fail('支付成功', 2)
        history.goBack()
      }
    )
  }
  useEffect(() => {
    getPay()
  }, [])
  return (
    <></>
  )
}

export default Pay
