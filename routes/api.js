var express = require('express')
var jsonfile = require('jsonfile')
var api = express.Router()

api.get('/', function (req, res) {
  res.json({'key': 'value'})
})

api.get('/course/all', function (req, res) {
  var course_file = 'public/json/course_list.json'

  function sortByKey (array, key) {
    return array.sort(function (a, b) {
      var x = a[key]
      var y = b[key]
      return ((x < y) ? -1 : ((x > y) ? 1 : 0))
    })
  }

  jsonfile.readFile(course_file, function (err, course_list) {
    return res.json(sortByKey(course_list, 'id'))
  })
})

api.get('/user/:user_id', function (req, res) {
  var user_id = req.params.user_id
  var user_file = 'public/json/user.json'
  jsonfile.readFile(user_file, function (err, user_list) {
    // read user data
    for (var i = 0; i < user_list.length; i++) {
      if (user_id === user_list[i].id) {
        return res.json(user_list[i])
      }
    }
    return res.status(404).json({'error': 'user not found'})
  })
})

api.post('/enroll', function (req, res) {
  res.send('course enrollment recived')
  console.log(req.body)
  var user_id = req.body.user_id
  var enroll_list = req.body.enroll_list
  var user_file = 'public/json/user.json'
  // read user data
  var user_list = jsonfile.readFileSync(user_file)
  for (var i = 0; i < user_list.length; i++) {
    if (user_id === user_list[i].id) {
      // enroll user's courses
      user_list[i].courses = enroll_list
      break
    }
  }
  // write user data back to user.json
  jsonfile.writeFileSync(user_file, user_list, {spaces: 2})
  console.log('user ' + user_id + ' course enrollment recived')
})

module.exports = api
