const DATE_ORDINAL = 0
const HOURS_ORDINAL = 1
const EMPLOYEE_ID_ORDINAL = 2
const GROUP_ORDINAL = 3

/**
  * Provided a filename return the related report id
 */
module.exports.extractReportId = function(fileName) {
  // TODO: make it more intuitive, use nodejs path, regex)
  return fileName.split('.')[0].split('-')[2]
}

/**
 * Given a buffer representation of our data return an array of pay entries
 */
module.exports.extractPayEntries = function(fileData) {
  const csvContent = fileData.toString()

  return csvContent.split(/\r?\n/) // split by new line
                  .splice(1) // remove header
}

module.exports.parsePayEntry = function(payEntryString) {
  const fields = payEntryString.split(',')

  // need to juggle days and months in order to parse the date
  const dateParts = fields[DATE_ORDINAL].split('/')
  const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])

  return {
    date: +date,
    hours: parseFloat(fields[HOURS_ORDINAL]),
    employeeId: +fields[EMPLOYEE_ID_ORDINAL],
    group: fields[GROUP_ORDINAL]
  }
}
