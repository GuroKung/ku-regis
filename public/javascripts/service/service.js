angular.module('ku-regis')
  .service('Course_enroll', function(){
    var self = this
    self.enroll_list = []

    self.enroll = function (course_id, course_name_en, course_name_th) {
      console.log('course added')
      self.enroll_list.push({id: course_id, name_en: course_name_en, name_th: course_name_th})
      console.log(self.enroll_list)
    }

    self.remove = function (course_id){
      console.log('course removed');
      for (var i = 0 ; i < self.enroll_list.length ; i++) {
        if(self.enroll_list[i].id === course_id){
          self.enroll_list.splice(i,1);
          console.log(self.enroll_list)
          return
        }
      }
    }

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
