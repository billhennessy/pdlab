/**
 * Created by billh_000 on 10/6/2014.
 */
'use strict';

app.controller('ChallengeViewCtrl', function ($scope, $routeParams, Challenge) {

    $scope.challenge = Challenge.find($routeParams.challengeId);

    $scope.comments = Challenge.comments($routeParams.challengeId).$asArray();

    $scope.addComment = function () {

        Challenge.addComment($routeParams.challengeId, $scope.comment);
        // console.log($routeParams.postId +": " + $scope.comment.text);
        $scope.comment = '';
    };
});
