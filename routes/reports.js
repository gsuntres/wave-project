const express = require('express')
const router = module.exports = express.Router()

const { payrollReport } = require('../lib/service')

router.get('/payroll', (req, res) => {
  const report = payrollReport()

  res.send({ payrollReport: report })
})
