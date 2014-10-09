/**
 * Created by billh_000 on 10/6/2014.
 */
'use strict';

app.controller('ChallengesCtrl', function ($scope, $location, Challenge) {
    if ($location.path() === '/challenges') {
        $scope.challenges = Challenge.all;
    }
    $scope.challange = {
        title: '',
        description: '',
        links: {},
        video: '',
        pdf: '',
        points: 0

    };

    $scope.submitChallenge = function () {
        Challenge.create($scope.challenge).then(function (ref) {
            $scope.challange = {
                title: '',
                description: '',
                links: {},
                video: '',
                pdf: '',
                points: 0
            };
            $location.path('/challenges/' + ref.name());
        });
    };

    $scope.deleteChallenge = function (challenge) {
        Challenge.delete(challenge);
    };

    $scope.removeComment = function (comment) {
        Challenge.deleteComment($scope.challenge, comment);
    };

});