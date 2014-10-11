/* global app:true */
'use strict';

/**
 * @ngdoc overview
 * @name angNewsApp
 * @description
 * # angNewsApp
 *
 * Main module of the application.
 */

var app = angular.module('angNewsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
    .constant('FIREBASE_URL', 'https://pdlab.firebaseIO.com/')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/publichome.html',
        controller: 'AboutCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
        .when('/posts/:postId', {
            templateUrl: 'views/showpost.html',
            controller: 'PostViewCtrl'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'AuthCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'AuthCtrl'
        })
        .when('/users/:username', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl'
        })
        .when('/labs', {
            templateUrl: '../views/admin/admin-labs.html',
            controller: 'LabCtrl'
        })
        .when('/labs/:labname', {
            templateUrl: '../views/admin/admin-labs.html',
            controller: 'LabCtrl'
        })

        .when('/users', {
            templateUrl: '../views/admin/admin-users.html',
            controller: 'UsersCtrl'
        })
        .when('/features',{
            templateUrl: 'views/features.html',
            controller: 'FeatureCtrl'
        })
        .when('/admin/challenges', {
            templateUrl: 'views/admin/admin-challenges.html',
            controller: 'ChallengesCtrl'
        })
        .when('/admin/features', {
            templateUrl: 'views/admin/admin-features.html',
            controller: 'FeatureCtrl'
        })

        .when('/challenges', {
            templateUrl: 'views/challenges.html',
            controller: 'ChallengesCtrl'
        })
        .when('/challenges/:challengeId',{
            templateUrl: 'views/showchallenge.html',
            controller: 'ChallengeViewCtrl'
        })
        .when('/features/:featureId',{
            templateUrl: 'views/features.html',
            controller: 'FeatureCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
