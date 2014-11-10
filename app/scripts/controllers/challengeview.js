/**
 * Created by billh_000 on 10/6/2014.
 */
'use strict';

app.controller('ChallengeViewCtrl', function ($scope, $anchorScroll, $location, $routeParams, $modal, $sce, Challenge, Profile, Auth) {
    $scope.challenge = Challenge.get($routeParams.challengeId);
    $scope.comments = Challenge.comments($routeParams.challengeId);

    $scope.user = Auth.user;
    $scope.signedIn = Auth.signedIn;

    $scope.addComment = function () {
        if (!$scope.commentText || $scope.commentText === '') {
            return;
        }

        var comment = {
            text: $scope.commentText,
            creator: $scope.user.profile.username,
            creatorUID: $scope.user.uid
        };
        $scope.comments.$add(comment);

        $scope.commentText = '';
    };

    $scope.deleteComment = function (comment) {
        $scope.comments.$remove(comment);
    };

    $anchorScroll.yOffset = -100;
    $scope.scroll = function (location) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(location);

        // call $anchorScroll()
        $anchorScroll();
    };


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

