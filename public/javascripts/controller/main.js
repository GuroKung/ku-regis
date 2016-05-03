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

  .controller('CoursesController', function ($http, $state, $location, $anchorScroll) {
    var self = this
    self.course_list = {}

    $http.get('https://whsatku.github.io/skecourses/list.json')
      .success(function (response) {
        console.log(response)
        self.course_list = response
      })
      .error(function (response) {
        console.log('error: cannot get list course json file')
      })

    self.viewInfo = function (course_id) {
      $state.transitionTo('info', {course_id: course_id})
    }

    self.toTop = function () {
      console.log('to Top')
      $location.hash('top')
      $anchorScroll()
    }

  })

  .controller('EnrollController', function ($http) {
    var self = this
    self.course_list = {}

    $http.get('https://whsatku.github.io/skecourses/list.json')
      .success(function (response) {
        console.log(response)
        self.course_list = response
      })
      .error(function (response) {
        console.log('error: cannot get list course json file')
      })

  })

  .controller('InfoController', function ($http, $state, $stateParams) {
    var self = this

    self.course_id = $stateParams.course_id
    self.course_info = {}

    $http.get('https://whsatku.github.io/skecourses/' + self.course_id + '.json')
      .success(function (response) {
        console.log(response)
        self.course_info = response
      })
      .error(function (response) {
        console.log('error: cannot get course info json file')
      })

  })

  .service('Auth', function () {
    var self = this

    self.user = {
      email: '',
      pwd: ''
    }
  })
