/**
 * Created by billh_000 on 9/17/2014.
 */
'use strict';

app.controller('PostsCtrl', function ($scope, $location, Post, Auth) {
    $scope.posts = Post.all;
    $scope.user = Auth.user;

    $scope.post = {url: 'http://', 'title': ''};


    $scope.deletePost = function (post) {
        Post.delete(post);
    };

});