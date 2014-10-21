/**
 * Created by billh_000 on 10/4/2014.
 */

'use strict';

app.controller('UsersCtrl', function ($scope, $location, $routeParams, Profile, Lab) {

    //TODO: Order by points descending


    $scope.users = Profile.all; // Lab.users($routeParams.labId).$asArray();

    $scope.predicate = '-points';


});