/**
 * Created by bhenn_000 on 10/19/2014.
 */

'use strict';

app.controller('ProfilesCtrl', function ($scope, $location, $routeParams, Auth, Profile) {
    var uid = $routeParams.userId;
    $scope.user = Auth.user;

    $scope.profile = Profile.get(uid);

    $scope.update = function (user) {
        return Profile.update(user).then(function () {
            $location.path('admin/users');
        });
    };

    Profile.getChallenges(uid).then(function (challenges) {
        $scope.challenges = challenges;
    });

    Profile.getPosts(uid).then(function (posts) {
        $scope.posts = posts;
    });
});