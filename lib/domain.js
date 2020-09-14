// This is our domain access object (or Data Access Object)

module.exports.timeReportParsed = function(id) {
  return typeof global.parsedTimeReports[id] !== 'undefined'
}

module.exports.doneTimeReport = function(id) {
  global.parsedTimeReports[id] = +new Date()
}

module.exports.savePay = function(pay) {
  if(typeof global.payByEmployee[pay.employeeId] === 'undefined') {
    global.payByEmployee[pay.employeeId] = []
  }
  global.payByEmployee[pay.employeeId].push(pay)
}

module.exports.getPayByEmployeeId = function(id) {
  return global.payByEmployee[id]
}

module.exports.getAllPay = function() {
  return global.payByEmployee
}
