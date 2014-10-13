/**
 * Created by billh_000 on 10/6/2014.
 */
'use strict';

app.controller('ChallengeViewCtrl', function ($scope, $routeParams, Challenge, $modal, $sce) {

    $scope.challenge = Challenge.find($routeParams.challengeId);

    $scope.challengeDone =

    $scope.comments = Challenge.comments($routeParams.challengeId).$asArray();

    $scope.addComment = function () {

        Challenge.addComment($routeParams.challengeId, $scope.comment);
        // console.log($routeParams.postId +": " + $scope.comment.text);
        $scope.comment = '';
    };

    $scope.completeChallenge = function (challengeId, points) {

        Challenge.userChallenge(challengeId, points).then(function () {
            $scope.open('large', '../../views/modals/congratsmodal.html');
        });

    }

    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }
    $scope.open = function (size, templateUrl) {
        var modalInstance = $modal.open({
            templateUrl: templateUrl,
            size: size
        })
    }


});
