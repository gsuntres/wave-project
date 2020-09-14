const debug = require('debug')('wave')
const utils = require('./utils')

class EmployeeReportLine {

  constructor(employeeId, payPeriodKey, amountPaid) {
    this.employeeId = +employeeId
    
    const { firstDay, lastDay } = utils.keyToPayPeriod(payPeriodKey)
    const firstDate = new Date(firstDay)
    const lastDate = new Date(lastDay)

    this.payPeriod = {
      startDate: utils.displayDate(firstDate),
      endDate: utils.displayDate(lastDate)
    }

    this.amountPaid = utils.displayAmount(amountPaid)
  }
}

class EmployeeReport {

  constructor(employeeId) {
    this.employeeId = employeeId
    this.lines = []
  }

  parseEntries(entries) {
    // sort by date asc
    entries.sort((a, b) => a.date - b.date)

    // accumulate amounts paid by pay period
    const paidByPayPeriod = {}
    for(let idx in entries) {
      const entry = entries[idx]
      debug('entry: %O', entry)

      // update paid
      const payPeriod = utils.getPayPeriodFromDate(entry.date)
      const payPeriodKey = utils.payPeriodToKey(payPeriod)
      if(typeof paidByPayPeriod[payPeriodKey] === 'undefined') {
        paidByPayPeriod[payPeriodKey] = { paid: 0 }
      }

      paidByPayPeriod[payPeriodKey].paid += entry.paid
    }

    // populate lines
    for(let periodKey in paidByPayPeriod) {
      const { paid } = paidByPayPeriod[periodKey]
      this.lines.push(new EmployeeReportLine(this.employeeId, periodKey, paid))
    }
  }

}

module.exports = EmployeeReport
