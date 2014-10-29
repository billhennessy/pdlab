/**
 * Created by billh_000 on 10/2/2014.
 */


'use strict';

app.controller('LabsCtrl', function ($scope, $location, Lab, Profile, Auth) {
  $scope.labs = Lab.all;
  $scope.user = Auth.user;

  $scope.lab = {client: '', ae: '', contact: '', day1: '', day2: '', facilitator: '', pm: '', track: ''};

  $scope.resetLab = function () {
    $scope.lab = {client: '', ae: '', contact: '', day1: '', day2: '', facilitator: '', pm: '', track: ''};
  };

  $scope.updateLab = function (lab) {
    console.log(lab.id);
    return Lab.update(lab).then(function () {
      $scope.success = "Lab updated.";
    });
  }, function (error) {
    $scope.error = error.toString();
  };

  $scope.deleteLab = function (lab) {
    Lab.delete(lab);
  };

  $scope.selectLab = function (labId) {

    $scope.lab = Lab.get(labId);
    $scope.getUsers(labId);
  };


  $scope.getUsers = function (labId) {
    Lab.getUsers(labId).then(function (users) {
      $scope.users = users;
    });
  };
});

/*

 'use strict';

 app.controller('LabCtrl', function ($scope, $location, Auth, Lab) {
 $scope.lab = {client: '', code: '', contact: '', projectmgr: '', ae: '', facilitator: '', day1: '', day2: '', track: '' };

 $scope.labs = Lab.all;
 $scope.lab_users = "";

 $scope.lab = Lab.findByClient('ajsdfkj9');
 console.log($scope.lab);

 //$scope.currentUser = User.currentUser;
 $scope.submitLab = function () {
 Lab.create($scope.lab).then(function (labId) {
 $scope.resetLab();
 $location.path('/labs/' + labId);
 });
 };

 $scope.resetLab = function () {
 $scope.lab = {client: '', code: '', contact: '', projectmgr: '', ae: '', facilitator: '', day1: '', day2: '', track: '' };
 }
 $scope.selectLab = function (labId) {

 $scope.lab = Lab.find(labId);
 $scope.lab_users = Lab.users(labId).$asArray();

 }
 $scope.deleteLab = function (lab) {
 //console.log(labId);
 $scope.lab = Lab.delete(lab);
 }

 });*/
