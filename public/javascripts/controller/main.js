/*global angular */
angular.module('ku-regis', ['ui.router', 'ngCookies'])
  .controller('HomePageController', function ($state, Auth) {
    var self = this

    if (!Auth.isLogin()) {
      $state.go('login', {}, {reload: true})
    }
  })

  .controller('NavbarController', function ($state, Auth) {
    var self = this

    self.isLogin = function () {
      if ($state.$current.name === 'login') return true
      return false
    }

    self.logout = function () {
      Auth.logout()
      $state.transitionTo('login')
    }
  })

  .controller('LoginController', function ($state, Auth) {
    var self = this
    self.data = {
      username: '',
      pwd: ''
    }

    self.login = function () {
      if (self.data.username === 'b5610546702') {
        var data = {
          username: self.data.username,
          pwd: self.data.pwd
        }
        console.log(data)
        Auth.login(self.data.username, self.data.pwd)
        $state.go('home', {}, {reload: true})
      }
    }
  })

  .controller('CoursesController', function ($http, $state, $location, $anchorScroll) {
    var self = this
    self.course_list = []

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

  .controller('EnrollController', function ($http, $location, $anchorScroll) {
    var self = this
    self.course_list = []
    self.enroll = []

    $http.get('https://whsatku.github.io/skecourses/list.json')
      .success(function (response) {
        console.log(response)
        self.course_list = response
      })
      .error(function (response) {
        console.log('error: cannot get list course json file')
      })

    self.toTop = function () {
      console.log('to Top')
      $location.hash('top')
      $anchorScroll()
    }
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

  .service('Auth', function ($cookies) {
    var self = this

    self.user = {
      username: '',
      pwd: ''
    }

    self.isLogin = function () {
      if ($cookies.get('token') != null) return true
      return false
    }

    self.login = function (username, pwd) {
      self.user.username = username
      self.user.pwd = pwd
      $cookies.put('token', 'ABCEDFCLIJKLMNOPQRETUVWXYZ')
    }

    self.logout = function () {
      self.user = {
        username: '',
        pwd: ''
      }
      $cookies.remove('token')
    }
  })
