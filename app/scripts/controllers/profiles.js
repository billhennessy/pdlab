/**
 * Created by bhenn_000 on 10/19/2014.
 */

'use strict';

app.controller('ProfilesCtrl', function ($scope, $location, $routeParams, $modal, Auth, Profile) {
    var uid = $routeParams.userId;
    $scope.user = Auth.user;
    $scope.currentUser = Auth.user;
    $scope.profile = Profile.get(uid);
    // $scope.values = Profile.values(uid);


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

    $scope.changePassword = function (email, oldpassword, newpassword, newpassword2) {

        if (newpassword === newpassword2) {
            Auth.changePassword(email, oldpassword, newpassword).then(function () {
                $scope.error = "";
                $scope.message = "Success! Please remember your new password.";

            }, function (error) {
                $scope.error = error.toString();
            }).then(function () {
                $scope.email = "";
                $scope.oldpassword = "";
                $scope.newpassword = "";
            });
        } else {
            $scope.error = "Your new passwords do not match."
        }
    };

    $scope.open = function (size, templateUrl) {
        var modalInstance = $modal.open({
            templateUrl: templateUrl,
            size: size
        })
    }

    $scope.assignChallenges = function () {
        var d = Profile.assignChallenges('simplelogin:52');
        console.log(d);
    };


});

//TODO:  Change password

//TODO:  Update own profile (but not points)

