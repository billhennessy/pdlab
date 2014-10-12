/**
 * Created by billh_000 on 9/18/2014.
 */
'use strict';

app.controller('AuthCtrl',
    function ($scope, $location, Auth, User) {
        if (Auth.signedIn()) {
            $location.path('/');
        }

        $scope.$on('$firebaseSimpleLogin:login', function () {
            $location.path('/');
        });

        $scope.login = function () {
            Auth.login($scope.user).then(function () {
                $location.path('/challenges');
            }, function (error) {
                $scope.error = error.toString();
            });
        };

        $scope.register = function () {
            Auth.register($scope.user).then(function (authUser) {
                User.create(authUser, $scope.user.username, $scope.user.fname, $scope.user.lname, $scope.user.cell).then(function () {
                    $scope.login($scope.user);
                    $location.path('/');
                }, function (error) {
                    $scope.error = error.toString();
                });
            });


        };

        $scope.resetPassword = function (email) {
            Auth.resetPassword(email).then(function () {
                $scope.success = "Your email has been sent."
            }, function (error) {
                $scope.error = error.toString();
            });
        };

    });