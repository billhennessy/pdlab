/**
 * Created by bhenn_000 on 10/19/2014.
 */

'use strict';

app.controller('ProfilesCtrl', function ($scope, $location, $routeParams, $modal, Auth, Profile, Lab, challenges, profile) {
  var uid = $routeParams.userId;
  $scope.user = Auth.user;
  //$scope.labs = Lab.all;
  $scope.alerts = [];
  $scope.predicate = 'points';
  $scope.challenges = challenges;

  $scope.profile = profile; //Profile.get(uid);

  $scope.profile.$loaded(function () {

    var labId = $scope.profile.lab;
    $scope.lab = Lab.get(labId);

    Lab.getUsers(labId).then(function (labmates) {
      $scope.labmates = labmates;
    })
  });

  $scope.closeAlert = function (index) {
    $scope.alerts.splice(index, 1);
  };
  $scope.update = function (user) {

    return Profile.update(user)

      .then(function (ref) {
        ref.setPriority(user.username);
        $scope.success = "Updated";
      })

  },
    function (error) {
      $scope.error = error.toString();
    };


  function getCount(objs) {
    var i = 0;
    angular.forEach(objs, function (obj) {
      i++;
    })
    return i;
  }

  /*  Profile.getPosts(uid).then(function (posts) {
   $scope.posts = posts;
   });*/

  $scope.changePassword = function (email, obj) {

    if (obj.newpassword === obj.newpassword2) {
      Auth.changePassword(email, obj.oldpassword, obj.newpassword).then(function () {
        $scope.error = "";
        $scope.success = "Success! Please remember your new password.";
        $scope.resetEmail();

      }, function (error) {
        $scope.error = error.toString();
      })
    } else {
      $scope.error = "Your new passwords do not match."
    }
  };

  $scope.resetEmail = function () {

    $scope.obj.oldpassword = "";
    $scope.obj.newpassword = "";
    $scope.obj.newpassword2 = "";
  }


  /* $scope.assignChallenges = function() {
   var d = Profile.assignChallenges('simplelogin:52');
   console.log(d);
   };*/


  $scope.assignLab = function (labId, userId) {
    return Lab.addUser(labId, userId);
  },
    function (error) {
      $scope.error = error.toString();

    };

  $scope.joinLab = function (user) {

    if (user.accepted) {
      Lab.users(user.profile.lab).$add(user.uid).then(function () {
        user.$save();
      });
      $scope.success = "Welcome";
      $location.url('users/' + user.uid);
    } else {
      $scope.error = "You have not accepted your commitment."
    }
  };

  $scope.open = function (size, templateUrl) {
    var modalInstance = $modal.open({
      templateUrl: templateUrl,
      controller: 'ProfileInstanceCtrl',
      size: size,
      resolve: {
        profile: function () {
          return $scope.profile;
        }
      }
    })
  }


});

app.controller('ProfileInstanceCtrl', ['$scope', '$modalInstance', 'Profile', 'profile',
  function ($scope, $modalInstance, Profile, profile) {
    $scope.profile = profile;
    $scope.ok = function () {
      Profile.update(profile);
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])

//TODO:  Change password

//TODO:  Update own profile (but not points)

/*app.factory('loadChallengesService', function($routeParams, Profile, $q) {
 var uid = $routeParams.userId;
 return {
 getChallenges: function() {
 return $q.when(
 Profile.getChallenges($routeParams.userId).then(function(challenges) {
 return challenges;
 })
 )
 },
 getProfile: function() {
 return $q.when(profile.get($routeParams.userId));
 }

 }


 });*/
