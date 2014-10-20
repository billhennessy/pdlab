/**
 * Created by billh_000 on 9/19/2014.
 */
'use strict';


app.controller('ProgressCtrl',
    function ($scope, $location, Challenge, Lab, Auth, Profile) {


        $scope.user = Auth.user;
        $scope.users = Profile.all;
        /*if($scope.user){
         $scope.users =  Lab.users($scope.user.labcode).$asArray();
         };*/


        $scope.isCollapsed = true;


    });