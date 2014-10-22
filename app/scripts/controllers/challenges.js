/**
 * Created by billh_000 on 10/6/2014.
 */
'use strict';

//TODO: Fix the Congratulations Modal.

app.controller('ChallengesCtrl', function ($scope, $location, $routeParams, $modal, $sce, Challenge, Profile, Auth) {
    $scope.challenges = Challenge.all;
    $scope.user = Auth.user;
    //$scope.challenge = $routeParams.challengeId;
    $scope.challenge = "";

    $scope.submitChallenge = function () {
        $scope.challenge.creator = $scope.user.profile.username;
        $scope.challenge.creatorUID = $scope.user.uid;
        Challenge.create($scope.challenge).then(function (ref) {
            $location.path('/challenges/' + ref.name());
            $scope.challange = {title: '', description: '', link: '', linktype: '', points: 0

            };
        });
    };

    $scope.userChallenges = function (challengeId) {
        var uchallenges = Profile.findChallenge('simplelogin:11', challengeId);
        console.log(uchallenges);
    };

    $scope.deleteChallenge = function (challenge) {
        Challenge.delete(challenge);
    };
    $scope.open = function (size, challenge) {
        $scope.challenge = challenge;
        var modalInstance = $modal.open({
            templateUrl: 'challengesmodal.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                challenge: function () {
                    return $scope.challenge;
                }
            }
        })
    };


});


app.controller('ModalInstanceCtrl', function ($scope, $sce, $modal, $modalInstance, Auth, Challenge, Profile, challenge) {

    $scope.challenge = challenge;
    $scope.user = Auth.user;

    $scope.ok = function () {

        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    };

    $scope.complete = function (challengeId) {
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

    };

    $scope.open = function (size, templateUrl) {
        var modalInstance = $modal.open({
            templateUrl: templateUrl,
            size: size
        })
    }
});
