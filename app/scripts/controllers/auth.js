/**
 * Created by billh_000 on 9/18/2014.
 */
'use strict';

app.controller('AuthCtrl', function ($scope, $location, Auth, user) {
    if (user) {
        $location.path('challenges');
    }

    $scope.login = function () {
        Auth.login($scope.user).then(function () {
            $location.path('challenges');
        }, function (error) {
            $scope.error = error.toString();
        });
    };

    $scope.register = function () {
        Auth.register($scope.user).then(function (user) {
            return Auth.login($scope.user).then(function () {
                user.username = $scope.user.username;
                user.lab = $scope.user.lab;
                user.points = 0;
                return Auth.createProfile(user);
            }).then(function () {
                $location.path('#/challenges');
            });
        }, function (error) {
            $scope.error = error.toString();
        });
    };

    $scope.resetPassword = function (email) {
        console.log(email);
        Auth.resetPassword(email).then(function () {
            $scope.success = "Your email has been sent."
        }, function (error) {
            $scope.error = error.toString();
        });
    };
});

//TODO:  Reset password

//TODO:  Forgot password email

//TODO:  Stop logins for halfway registered users

/*
 app.controller('AuthCtrl',
 function ($scope, $location, $routeParams, Auth, User) {
 if (Auth.signedIn()) {
 $location.path('/');
 }
 $scope.user = {username: '', fname: '', lname: '', labcode: '', cell: null};

 $scope.$on('$firebaseSimpleLogin:login', function () {
 $location.path('/');
 });

 $scope.login = function () {
 Auth.login($scope.user, $routeParams.labId).then(function () {
 $location.path('/challenges');
 }, function (error) {
 $scope.error = error.toString();
 });
 };

 $scope.register = function () {
 if ($scope.user.labcode != '') {
 Auth.register($scope.user).then(function (authUser) {
 User.create(authUser, $scope.user.username, $scope.user.fname, $scope.user.lname, $scope.user.labcode, $scope.user.cell).then(function () {
 $scope.login($scope.user);
 $location.path('/');
 }, function (error) {
 $scope.error = error.toString();
 });
 });
 } else {
 console.log($scope.user.labcode);
 $scope.error = "You entered an invalid Lab Code. Check your invitation email and try again.";
 }
 ;

 };

 $scope.resetPassword = function (email) {
 Auth.resetPassword(email).then(function () {
 $scope.success = "Your email has been sent."
 }, function (error) {
 $scope.error = error.toString();
 });
 };

 });*/
