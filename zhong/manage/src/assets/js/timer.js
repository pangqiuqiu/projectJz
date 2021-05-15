// 时间快捷键
export const pickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]
}

// 处理传递给后端的时间格式
export function dateConversion (value) {
  function checkTime (i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }
  var d = new Date(value)
  var date = d.getFullYear() + '-' + checkTime(d.getMonth() + 1) + '-' + checkTime(d.getDate()) + ' ' + checkTime(d.getHours()) + ':' + checkTime(d.getMinutes()) + ':' + checkTime(d.getSeconds())
  return date
}

export function dateConversionMonth (value) {
  function checkTime (i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }
  var d = new Date(value)
  var date = d.getFullYear() + '-' + checkTime(d.getMonth() + 1)
  return date
}
