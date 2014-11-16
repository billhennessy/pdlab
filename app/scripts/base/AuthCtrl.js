/**
 * Created by billh_000 on 9/18/2014.
 */
'use strict';

app.controller('AuthCtrl', function ($scope, $routeParams, $location, Auth, Profile, Lab, user, $modal) {
    if (user) {
      $location.path('users/' + user.uid);
    }

  $scope.user = {};

  if ($routeParams) {
    $scope.user.lab = $routeParams.labId;
    $scope.user.email = $routeParams.email;
  }


  $scope.typing = true;

  $scope.login = function () {

    Auth.login($scope.user).then(function (user) {


      Profile.actions(user.uid).$add({
        login: Date.now()
      });
      $location.path('users/' + user.uid);
    }), function (error) {

      $scope.error = error.toString();
            $scope.typing = true;
    };
    };

  /* $scope.glogin = function() {
   = Auth.glogin($scope.user);
   console.log(m);


   }*/

  $scope.register = function () {
    Auth.register($scope.user).then(function (user) {
      return Auth.login($scope.user).then(function () {
                user.username = $scope.user.username;
                user.lab = $scope.user.lab;
                user.points = 0;
        user.$priority = user.username;
        var uid = user.uid;
        return Auth.createProfile(user)
      }).then(function () {
        $location.path('accept/' + user.uid);
            });
    }, function (error) {
            $scope.error = error.toString();
            $scope.typing = true;
        });
    };

  $scope.resetPassword = function (email) {
        $scope.typing = false;
    Auth.resetPassword(email).then(function () {
            $scope.success = "Your email has been sent."
            $scope.error = "";
            $scope.typing = true;
    }, function (error) {
            $scope.error = error.toString();
            $scope.success = "";
            $scope.typing = true;
        });
    };

  // add spinner for registration and logging in

  $scope.spinner = function (size) {


    var modalInstance = $modal.open({
      template: '<i class="fa fa-spinner fa-spin fa-4x"></i>',
      controller: '',
      size: size


    })
  };

});

//TODO:  Reset password

//TODO:  Forgot password email

//TODO:  Stop logins for halfway registered users
