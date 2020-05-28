function kilochange (value) {
  return value > 1000 ? (value / 1000).toFixed(1) + 'k' : value
}

function exchangeTime (val) {
  if (val == null || val === '') {
    return null
  } else {
    const d = new Date(val)// val 为表格内取到的后台时间
    const month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
    const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    const sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
    const times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec
    // const times = month + '-' + day + ' ' + hours + ':' + min + ':' + sec
    return times
  }
}

export {kilochange, exchangeTime}