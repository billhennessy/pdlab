/**
 * Created by billh_000 on 10/6/2014.
 */
'use strict';


app.controller('ChallengesCtrl', function ($scope, $location, Challenge, Auth) {
    $scope.challenges = Challenge.all;
    $scope.user = Auth.user;

    $scope.challange = {
        title: '',
        description: '',
        link: '',
        linktype: '',
        points: 0

    };

    $scope.submitChallenge = function () {
        $scope.challenge.creator = $scope.user.profile.username;
        $scope.challenge.creatorUID = $scope.user.uid;
        Challenge.create($scope.challenge).then(function (ref) {
            $location.path('/challenges/' + ref.name());
            $scope.challange = {title: '', description: '', link: '', linktype: '', points: 0

            };
        });
    };

    $scope.deleteChallenge = function (challenge) {
        Challenge.delete(challenge);
    };

});


/*
 app.controller('ChallengesCtrl', function ($scope, $location, Challenge) {
 if ($location.path() === '/challenges' || $location.path() === '/admin/challenges') {
 $scope.challenges = Challenge.all;
 console.log($scope.challenges);



 }
 $scope.challange = {
 title: '',
 description: '',
 link: '',
 linktype: '',
 points: 0

 };
 $scope.sumPoints = function (challenges) {
 var point = 0;
 angular.forEach(challenges, function (challenge) {
 point += parseInt(challenge.points);
 });
 return point;
 };


 $scope.submitChallenge = function () {
 Challenge.create($scope.challenge).then(function (ref) {
 $scope.challange = {
 title: '',
 description: '',
 link: '',
 linktype: '',
 points: 0
 }
 $location.path('/admin/challenges/');
 });
 };

 $scope.deleteChallenge = function (challenge) {
 Challenge.delete(challenge);
 };

 $scope.removeComment = function (comment) {
 Challenge.deleteComment($scope.challenge, comment);
 };

 });*/
