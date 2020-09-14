const keyToPayPeriod = function(key) {
  const parts = key.split('-')
  return {
    firstDay: +new Date(+parts[0]),
    lastDay: +new Date(+parts[1])
  }
}

// TODO looks like a hack, consider using Map
const payPeriodToKey = function(payPeriod) {
  const { firstDay, lastDay } = payPeriod
  return (+firstDay) + '-' + (+lastDay)
}

const getPayPeriodFromDate = function(unixtime) {
  const date = new Date(unixtime), y = date.getFullYear(), m = date.getMonth()

  const firstDate = +new Date(y, m, 1)
  const middleDate = +new Date(y, m, 15)
  const middleDatePlusOne = +new Date(y, m, 16)
  const lastDate = +new Date(y, m + 1, 0)

  const isAfter15th = unixtime > middleDate

  return {
    firstDay : isAfter15th ? middleDatePlusOne : firstDate,
    lastDay  : isAfter15th ? lastDate : middleDate
  }
}

const displayDate = function(date) {
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()
  if (month.length < 2)
       month = '0' + month
   if (day.length < 2)
       day = '0' + day

  return `${date.getFullYear()}-${month}-${day}`
}

const displayAmount = function(amount) {
  return `$${parseFloat(amount / 100).toFixed(2)}`
}


module.exports = {
  keyToPayPeriod,
  payPeriodToKey,
  getPayPeriodFromDate,
  displayDate,
  displayAmount
}
