/**
 * Created by billh_000 on 9/18/2014.
 */
'use strict';

app.controller('NavCtrl', function ($scope, $location, $anchorScroll, $modal, Post, Auth, Profile) {
    $scope.signedIn = Auth.signedIn;
    $scope.logout = Auth.logout;
    $scope.user = Auth.user;
    $scope.mission = {};

    $scope.scroll = function (location) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(location);

        // call $anchorScroll()
        $anchorScroll();
    };


});
//TODO: Click on username to open profile.
