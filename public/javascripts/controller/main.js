/*global angular */
angular.module('ku-regis', ['ui.router'])
  .controller('HomePageController', function () {
    var self = this

    self.age = 21
  })
  .controller('LoginController', function ($state) {
    var self = this

    self.data = {
      email: '',
      pwd: ''
    }

    self.login = function () {
      var data = {
        email: self.data.email,
        pwd: self.data.pwd
      }
      console.log(data)
      $state.go('home', {}, {reload: true})
    }
  })

  .controller('CoursesController', function ($http) {
    var self = this
    self.course_list = []

    $http.get('https://whsatku.github.io/skecourses/list.json')
      .success(function (response) {
        console.log(response)
        self.course_list = response
      })
      .error(function (response) {
        console.log('error: cannot get cobined course json file')
      })

  })

  .service('Auth', function () {
    var self = this

    self.user = {
      email: '',
      pwd: ''
    }
  })
