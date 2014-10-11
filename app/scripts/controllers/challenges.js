/**
 * Created by billh_000 on 10/6/2014.
 */
'use strict';

app.controller('ChallengesCtrl', function ($scope, $location,User, Challenge) {
    if ($location.path() === '/challenges' || $location.path() === '/admin/challenges') {
        $scope.challenges = Challenge.all;

    }
    $scope.challange = {
        title: '',
        description: '',
        link: '',
        linktype: '',
        points: 0

    };
    $scope.sumPoints = function(challenges){
     var point = 0;
        angular.forEach(challenges, function(challenge){
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

    $scope.isComplete = function () {
        return
    }
});