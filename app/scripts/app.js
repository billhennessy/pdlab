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

var app = angular.module('pdlab', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'firebase',
  'ui.bootstrap',
  'ngOrderObjectBy'
])
    .constant('FIREBASE_URL', 'https://pdlab.firebaseIO.com/')
  .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/publichome.html',
                controller: 'AboutCtrl'
            })
            /*.when('/about', {
             templateUrl: 'views/about.html',
             controller: 'AboutCtrl'
             })*/
            .when('/posts/:postId', {
                templateUrl: 'views/showpost.html',
                controller: 'PostViewCtrl'
            })

          .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'AuthCtrl',
                resolve: {
                  user: function (Auth) {
                        return Auth.resolveUser();
                    }
                }
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'AuthCtrl',
                resolve: {
                  user: function (Auth) {
                        return Auth.resolveUser();
                    }
                }
            })
            .when('/progress', {
                templateUrl: 'views/progress.html',
                controller: 'ProgressCtrl'
            })
            /*
             .when('/login', {
             templateUrl: 'views/login.html',
             controller: 'AuthCtrl'
             })*/
            .when('/users/:userId', {
                templateUrl: 'views/profile.html',
                controller: 'ProfilesCtrl'
            /*,
             resolve: {
             challenges: function (loadChallengesService) {
             return loadChallengesService.getChallenges();
             },
             profile: function (loadChallengesService) {
             return loadChallengesService.getProfile();
             }
             }*/

            })

          .when('/users/:labId/:userId', {
            templateUrl: 'views/profile.html',
            controller: 'ProfilesCtrl'
          })

          .when('/newprof/:userId', {
            templateUrl: 'views/profile.html'
          })

          .when('/admin/users', {
                templateUrl: 'views/admin/admin-users.html',
            controller: 'UsersCtrl',
            resolve: {
              leaders: function (Profile) {
                return Profile.all;
              }
            }
            })
            .when('/features', {
                templateUrl: 'views/features.html',
            controller: 'FeaturesCtrl',
            resolve: {
              features: function (Feature) {
                return Feature.all;
              }
            }
            })
            .when('/admin/challenges', {
                templateUrl: 'views/admin/admin-challenges.html',
            controller: 'ChallengesCtrl',
            resolve: {
              challenges: function (Challenge) {
                return Challenge.all;
              }
            }
            })
            .when('/admin/features', {
                templateUrl: 'views/admin/admin-features.html',
            controller: 'FeaturesCtrl',
            resolve: {
              features: function (Feature) {
                return Feature.all;
              }
            }
            })

          .when('/challenges', {
                templateUrl: 'views/challenges.html',
            controller: 'ChallengesCtrl',
            resolve: {
              challenges: function (Challenge) {
                return Challenge.all;
              }
            }
            })
            .when('/challenges/:challengeId', {
                templateUrl: 'views/showchallenge.html',
                controller: 'ChallengeViewCtrl'
            })
            .when('/features/:featureId', {
                templateUrl: 'views/showfeature.html',
                controller: 'FeatureViewCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/leaders', {
                templateUrl: 'views/leaders.html',
            controller: 'LeadersCtrl'
            })
          .when('/admin/labs', {
            templateUrl: 'views/admin/admin-lab-users.html'
          })

          .otherwise({
            redirectTo: '/'
          });
    });
