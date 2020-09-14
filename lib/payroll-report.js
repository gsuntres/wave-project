class PayrollReport {

  constructor() {
    this.employeeReports = []
  }

  addEmployeeReport(employeeReport) {
    const lines = employeeReport.lines
    for(let i = 0; i !== lines.length; i++) {
      const line = lines[i]
      this.employeeReports.push(line)
    }
  }

  getReport() {
    return {
      payrollReport: {
        employeeReports: this.employeeReports
      }
    }
  }

}

module.exports = PayrollReport
