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
    'ui.bootstrap'
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
            })
            .when('/users/:labId/:userId', {
                templateUrl: 'views/profile.html',
                controller: 'ProfilesCtrl'
            })

          /*.when('/admin/labs/:labId', {
                templateUrl: 'views/admin/admin-users.html',
                controller: 'UsersCtrl'
           })*/

            .when('/admin/users', {
                templateUrl: 'views/admin/admin-users.html',
                controller: 'UsersCtrl'
            })
            .when('/features', {
                templateUrl: 'views/features.html',
                controller: 'FeaturesCtrl'
            })
            .when('/admin/challenges', {
                templateUrl: 'views/admin/admin-challenges.html',
                controller: 'ChallengesCtrl'
            })
            .when('/admin/features', {
                templateUrl: 'views/admin/admin-features.html',
                controller: 'FeaturesCtrl'
            })

            .when('/challenges', {
                templateUrl: 'views/challenges.html',
                controller: 'ChallengesCtrl'
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
                controller: 'UsersCtrl'
            })
          .when('/admin/labs', {
            templateUrl: 'views/admin/admin-lab-users.html'
          })

            .otherwise({
                redirectTo: '/'
            });
    });
