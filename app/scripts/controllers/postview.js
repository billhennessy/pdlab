/**
 * Created by billh_000 on 9/18/2014.
 */
'use strict';

app.controller('PostViewCtrl', function ($scope, $routeParams, Post) {

    $scope.post = Post.find($routeParams.postId);

    $scope.comments = Post.comments($routeParams.postId).$asArray();

    $scope.addComment = function () {

        Post.addComment($routeParams.postId, $scope.comment);
        // console.log($routeParams.postId +": " + $scope.comment.text);
        $scope.comment = '';
    };
});
