/**
 * Created by billh_000 on 9/18/2014.
 */
'use strict';

app.controller('NavCtrl', function ($scope, $location, $modal, Post, Auth) {
    $scope.signedIn = Auth.signedIn;
    $scope.logout = Auth.logout;
    $scope.user = Auth.user;

    $scope.post = {url: 'http://', title: ''};

    $scope.submitPost = function () {
        $scope.post.creator = $scope.user.profile.username;
        $scope.post.creatorUID = $scope.user.uid;
        Post.create($scope.post).then(function (ref) {
            $location.path('/posts/' + ref.name());
            $scope.post = {url: 'http://', title: ''};
        });
    };
    $scope.open = function (size, templateUrl) {
        var modalInstance = $modal.open({
            templateUrl: templateUrl,
            size: size
        })
    }
});
//TODO: Click on username to open profile.