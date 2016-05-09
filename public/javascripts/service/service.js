angular.module('ku-regis')
  .service('Course_enroll', function () {
    var self = this
    self.enroll_list = []

    self.enroll = function (course_id, course_name_en, course_name_th , credit) {
      console.log('course added')
      self.enroll_list.push({id: course_id, name_en: course_name_en, name_th: course_name_th, credit: credit})
      console.log(self.enroll_list)
    }

    self.remove = function (course_id) {
      console.log('course removed')
      for (var i = 0; i < self.enroll_list.length; i++) {
        if (self.enroll_list[i].id === course_id) {
          self.enroll_list.splice(i, 1)
          console.log(self.enroll_list)
          return
        }
      }
    }

  })

  .service('Auth', function ($http, $cookies, $state, Course_enroll) {
    var self = this
    self.user = {}

    self.initUser = function () {
      $http.get('https://' + location.host + '/api/user/' + $cookies.get('token'))
        .success(function (response) {
          console.log(response)
          self.user = response
          // get user's course enrollment data
          Course_enroll.enroll_list = self.user.courses
        })
        .error(function (response) {
          console.log(response.error)
        })
    }

    self.isLogin = function () {
      if ($cookies.get('token') != null) return true
      return false
    }

    self.login = function (username, pwd) {
      $http.get('https://' + location.host + '/api/user/' + username.slice(1))
        .success(function (response) {
          console.log(response)
          self.user = response
          // get user's course enrollment data
          Course_enroll.enroll_list = self.user.courses
          $cookies.put('token', self.user.id)
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

    // if user still login, then init user data
    if (self.isLogin()) {
      self.initUser()
    }
  })
