/**
 * Created by billh_000 on 9/19/2014.
 */
'use strict';


app.controller('ProgressCtrl',
  function ($scope, $routeParams, $location, Profile) {

    var uid = $routeParams.userId;
    console.log(uid);
    $scope.user = Profile.get(uid);
    //$scope.users = Profile.all;
        /*if($scope.user){
         $scope.users =  Lab.users($scope.user.labcode).$asArray();
         };*/


        $scope.isCollapsed = true;


    });
