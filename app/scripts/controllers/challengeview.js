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

    /*  $scope.completeChallenge = function (challengeId) {
     var userId = $scope.user.uid;
     var challenge = Challenge.get(challengeId);
     var prePoints = parseInt($scope.user.profile.points);
     Challenge.completeChallenge(challengeId, userId).then(function () {
     var score = prePoints + parseInt(challenge.points);
     $scope.user.profile.points = score;
     $scope.user.profile.$save().then(function () {
     $scope.open('large', 'views/modals/congratsmodal.html');
     });

     });

     };*/

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

/*
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
 */