/* global angular */
;(function () {
  angular
    .module('ku-regis')
    .config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider']

  function config ($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.when('', '/login')
    // $urlRouterProvider.otherwise('/404')
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: './templates/home.tmpl',
        controller: 'HomePageController',
        controllerAs: 'homepageCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.tmpl',
        controller: 'LoginController',
        controllerAs: 'loginCtrl'
      })
  }
})()
