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

  .service('Auth', function () {
    var self = this

    self.user = {
      email: '',
      pwd: ''
    }

  })
