/**
 * Created by billh_000 on 10/4/2014.
 */

'use strict';

app.controller('UsersCtrl', function ($scope, $location, User) {

    //TODO: Order by points descending

    $scope.users = User.all;
    $scope.predicate = '-points';


});