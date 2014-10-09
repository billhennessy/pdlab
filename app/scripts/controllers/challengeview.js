/**
 * Created by billh_000 on 10/6/2014.
 */
'use strict';

app.controller('ChallengeViewCtrl', function ($scope, $routeParams, Challenge, $sce) {

    $scope.challenge = Challenge.find($routeParams.challengeId);
    console.log($scope.challenge.pdf);
    $scope.comments = Challenge.comments($routeParams.challengeId).$asArray();

    $scope.addComment = function () {

        Challenge.addComment($routeParams.challengeId, $scope.comment);
        // console.log($routeParams.postId +": " + $scope.comment.text);
        $scope.comment = '';
    };

    $scope.completeChallenge = function(challengeId){
        console.log(challengeId);
        Challenge.userChallenge(challengeId);
    }

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

});
