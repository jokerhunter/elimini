export function setData (key, value, expires) {
  var curTime = new Date().getTime()
  // var lastTime = curTime + expires * 60 * 1000
  localStorage.setItem(key, JSON.stringify({ data: value, curTime: curTime, expires: expires }))
}

// eslint-disable-next-line no-unused-vars
export function getData (key) {
  const dataObj = JSON.parse(localStorage.getItem(key))
  // console.log(dataObj)
  if (dataObj == null) {
    return null
  } else if (new Date().getTime() > dataObj.curTime + dataObj.expires * 60 * 1000) {
    removeData(key)
    console.log('已经过期')
    // TODO
    return null
  } else {
    // console.log(dataObj.data)
    setData(key, dataObj.data, dataObj.expires)
    return dataObj.data
  }
}

// eslint-disable-next-line no-unused-vars
export function removeData (key) {
  localStorage.removeItem(key)
}

export function clearData () {
  localStorage.clear()
}
