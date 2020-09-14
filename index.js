const express = require('express')
const fileUpload = require('express-fileupload')
const debug = require('debug')('wave')

const app = express()

app.use(fileUpload({ useTempFiles : false} ))

app.use('/upload', require('./routes/file-upload'))
app.use('/reports', require('./routes/reports'))

app.use((err, req, res, next) => {
  debug(err)
  res.status(500).send('Error: ' + err)
})

app.use((req, res, next) => {
  res.status(404).send('Page not found');
})

// initialize our temporary persistance layer and seed data
require('./dummy-db')

var serve = app.listen(4000, () => {
  var host = serve.address().address
  var port = serve.address().port

  console.log(`Listening on http://${host}:${port}`)
})
