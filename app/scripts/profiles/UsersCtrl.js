/**
 * Created by billh_000 on 10/4/2014.
 */

'use strict';

app.controller('UsersCtrl', function ($scope, $location, $routeParams, Profile, Lab, leaders) {

    //TODO: Order by points descending


  $scope.users = leaders; // Lab.users($routeParams.labId).$asArray();

  $scope.updatePriority = function (user) {
    console.log(user.username);

    Profile.setPriority(user.username);
    console.log('done');
  }
    $scope.predicate = '-points';


});
