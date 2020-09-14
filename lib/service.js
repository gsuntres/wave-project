const debug = require('debug')('wave')
const {
  timeReportParsed,
  doneTimeReport,
  savePay,
  getAllPay
} = require('./domain')
const {
  extractReportId,
  extractPayEntries,
  parsePayEntry
} = require('./file-parser')
const EmployeeReport = require('./employee-report')
const PayrollReport = require('./payroll-report')

// Process csv file, trows an Error when:
//
// - the report has already been processed

module.exports.processTimeReport = function(fileName, fileContent) {

  // 1. extract report id
  const reportId = extractReportId(fileName)
  debug('parsing report with id: %s', reportId)

  if(timeReportParsed(reportId)) {
    throw new Error('Time Report has already been processed')
  }

  // 2. find pay entries
  const entries = extractPayEntries(fileContent)
  debug('parsing %d entries', entries.length)

  // 3. segragate by employees
  for(let i = 0; i !== entries.length; i++) {
    const entry = entries[i]

    debug('entry: %s', entry)

    if(entry.trim().length !== 0) {
      const pay = parsePayEntry(entry)
      _processAndSavePay(pay)
    }
  }

  // mark report as parsed
  doneTimeReport(reportId)
}

module.exports.payrollReport = function() {
  const report = new PayrollReport()

  const payByEmployee = getAllPay()

  // build report for each employee
  for(let employeeId in payByEmployee) {
    const entries = payByEmployee[employeeId]

    const employeeReport = new EmployeeReport(employeeId)
    employeeReport.parseEntries(entries)

    report.addEmployeeReport(employeeReport)
  }

  return report
}

function _processAndSavePay(payEntry) {
  const {
    employeeId,
    hours,
    group,
    date
  } = payEntry

  const hourlyRate = global.wagesByGroup[group]

  const paid = hourlyRate * hours

  const pay = {
    employeeId,
    paid,
    date
  }

  savePay(pay)
}
