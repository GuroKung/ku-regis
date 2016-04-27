/* global angular */
;(function () {
  angular
    .module('ku-regis')
    .config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider']

  function config ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/home')
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: './templates/home.tmpl',
        controller: 'HomePageController',
        controllerAs: 'homepageCtrl'
      })
  }
})()
