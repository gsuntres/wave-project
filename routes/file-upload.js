const express = require('express')
const router = module.exports = express.Router()
const debug = require('debug')('wave')

const {
  processTimeReport
} = require('../lib/service')

router.post('/time-report', function(req, res) {
  try {
    processTimeReport(req.files.report.name, req.files.report.data)
    res.send('sent')
  } catch(ex) {
    res.status(400).send({ error: ex.message })
  }
})
