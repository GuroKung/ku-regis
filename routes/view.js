var express = require('express')
var viewsRoute = express.Router()

/* GET home page. */
viewsRoute.get('*', function (req, res) {
  res.render('index')
})

module.exports = viewsRoute
