var express = require('express')
var jsonfile = require('jsonfile')
var api = express.Router()

api.get('/', function (req, res) {
  res.json({'key': 'value'})
})

api.get('/user/:user_id', function (req, res) {
  var user_id = req.params.user_id
  var user_file = 'public/json/user.json'
  jsonfile.readFile(user_file, function (err, obj) {
    // read key
    for (var i = 0; i < obj.length; i++) {
      if (user_id === obj[i].id) {
        return res.json(obj[i])
      }
    }
    return res.status(404).json({'error': 'user not found'})
  })
})

api.post('/enroll', function (req, res) {
  res.send('response recived')
})

module.exports = api
