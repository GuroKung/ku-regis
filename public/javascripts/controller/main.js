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

  .controller('LoginController', function (Auth) {
    var self = this
    self.data = {
      username: '',
      pwd: ''
    }

    self.login = function () {
      var data = {
        username: self.data.username,
        pwd: self.data.pwd
      }
      console.log(data)
      Auth.login(self.data.username, self.data.pwd)
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
      $location.hash('top')
      $anchorScroll()
    }
  })

  .controller('EnrollController', function ($http, $location, $anchorScroll) {
    var self = this
    self.course_list = []
    self.enroll_list = []

    $http.get('https://whsatku.github.io/skecourses/list.json')
      .success(function (response) {
        console.log(response)
        self.course_list = response
      })
      .error(function (response) {
        console.log('error: cannot get list course json file')
      })

    self.alreadyEnroll = function (course_id) {
      // check if the given course is already enroll
      for (var i = 0; i < self.enroll_list.length; i++) {
        if (self.enroll_list[i].id === course_id) {
          return true
        }
      }
      return false
    }

    self.enroll = function (course_id, course_name_en, course_name_th) {
      console.log('course added')
      self.enroll_list.push({id: course_id, name_en: course_name_en, name_th: course_name_th})
      console.log(self.enroll_list)
    }

    self.submit = function () {
      $http.post('http://' + location.host + '/api/enroll', self.enroll)
        .success(function (response) {
          console.log(response)
        })
        .error(function (response) {
          console.log('error: cannot post course enrollment data to server')
        })
    }

    self.toTop = function () {
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

  .service('Auth', function ($http, $cookies, $state) {
    var self = this
    self.user = {}

    self.isLogin = function () {
      if ($cookies.get('token') != null) return true
      return false
    }

    self.login = function (username, pwd) {
      $http.get('http://' + location.host + '/api/user/' + username.slice(1))
        .success(function (response) {
          console.log(response)
          self.user = response
          $cookies.put('token', 'ABCEDFCLIJKLMNOPQRETUVWXYZ')
          $state.go('home', {}, {reload: true})
        })
        .error(function (response) {
          console.log(response.error)
        })
    }

    self.logout = function () {
      self.user = {}
      $cookies.remove('token')
    }
  })
