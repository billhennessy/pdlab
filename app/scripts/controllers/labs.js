/**
 * Created by billh_000 on 10/2/2014.
 */
'use strict';

app.controller('LabCtrl', function ($scope, $location, Auth, Lab, User) {
    $scope.lab = {client: '', code: '', contact: '', projectmgr: '', ae: '', facilitator: '', day1: '', day2: '', track: '' };
    $scope.labs = Lab.all;

    //$scope.currentUser = User.currentUser;
    $scope.submitLab = function () {
        Lab.create($scope.lab).then(function (labId) {
            $scope.lab = {client: '', code: '', contact: '', projectmgr: '', ae: '', facilitator: '', day1: '', day2: '', track: '' };
            $location.path('/labs/' + labId);
        });
    };

    $scope.labClear = function () {
        $scope.lab = {client: '', code: '', contact: '', projectmgr: '', ae: '', facilitator: '', day1: '', day2: '', track: '' };
    }
    $scope.selectLab = function (labId) {

        $scope.lab = Lab.find(labId);
    }
    $scope.deleteLab = function (lab) {
        //console.log(labId);
        $scope.lab = Lab.delete(lab);
    }

});