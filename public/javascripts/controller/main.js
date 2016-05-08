/*global angular */
angular.module('ku-regis', ['ui.router', 'ngCookies'])
  .controller('HomePageController', function ($state, Auth) {
    var self = this
    self.user = Auth.user

    if (!Auth.isLogin()) {
      $state.go('login', {}, {reload: true})
    }

    // start timer
    if ($state.$current.name === 'home') {
      startTime()
    }

    function startTime () {
      var today = new Date()
      var h = today.getHours()
      var m = today.getMinutes()
      var s = today.getSeconds()
      m = checkTime(m)
      s = checkTime(s)
      document.getElementById('time').innerHTML =
        h + ':' + m + ':' + s
      var t = setTimeout(startTime, 500)
    }
    function checkTime (i) {
      if (i < 10) { i = '0' + i }; // add zero in front of numbers < 10
      return i
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

      if (self.data.username !== 'b5610546702') {
        self.error = true
      }
      Auth.login(self.data.username, self.data.pwd)
    }
  })

  .controller('CoursesController', function ($http, $state, $location, $anchorScroll) {
    var self = this
    self.course_list = []

    $http.get('http://' + location.host + '/api/course/all')
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

  .controller('EnrollController', function ($http, $state, $location, $anchorScroll, Course_enroll, Auth) {
    var self = this
    self.course_list = []
    self.enroll_list = Course_enroll.enroll_list

    $http.get('http://' + location.host + '/api/course/all')
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

    self.enroll = function (course_id, course_name_en, course_name_th, credit_lec, credit_lab) {
      console.log('course added')
      // enroll course via service
      Course_enroll.enroll(course_id, course_name_en, course_name_th, credit_lec, credit_lab)
    }

    self.remove = function (course_id) {
      console.log('course removed')
      // remove course via service
      Course_enroll.remove(course_id)
    }

    self.submit = function () {
      $http.post('http://' + location.host + '/api/enroll', { user_id: Auth.user.id, enroll_list: self.enroll_list })
        .success(function (response) {
          console.log(response)
          $state.transitionTo('report')
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

  .controller('ReportController', function (Course_enroll) {
    var self = this

    self.enroll_list = Course_enroll.enroll_list
    console.log(self.enroll_list)

    self.getTotalCredits = function () {
      var total = 0
      for (var i = 0; i < self.enroll_list.length; i++) {
        var enroll_course = self.enroll_list[i]
        if (enroll_course.credit.lec != 0) {
          total += enroll_course.credit.lec
        }
        if (enroll_course.credit.lab != 0) {
          total += enroll_course.credit.lab
        }
      }
      return total
    }

  })
