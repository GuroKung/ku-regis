var express = require('express')
var api = express.Router()

api.get('/', function (req, res) {
  res.json({'key': 'value'})
})

module.exports = api
