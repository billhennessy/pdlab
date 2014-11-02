/**
 * Created by billh_000 on 10/6/2014.
 */
'use strict';

//TODO: Fix the Congratulations Modal.

app.controller('ChallengesCtrl', function ($scope, $location, $routeParams, $modal, $sce, Challenge, Profile, Auth, challenges) {
  $scope.challenges = challenges;
    $scope.user = Auth.user;
    //$scope.challenge = $routeParams.challengeId;
  $scope.challenge = {
    title: '',
    description: '',
    link: '',
    linktype: '',
    points: 0
  };

  $scope.submitChallenge = function () {
        $scope.m_challenge.creator = $scope.user.profile.username;
        $scope.m_challenge.creatorUID = $scope.user.uid;
    Challenge.create($scope.m_challenge).then(function (ref) {
      $scope.m_challenge = {
        title: '',
        description: '',
        link: '',
        linktype: '',
        points: 0
      };
      $scope.success = "You've created a new challenge called " + ref.title;
    }),
      function (error) {
        $scope.error = error.toString();
      };
    };

  $scope.userChallenges = function (challengeId) {
        var uchallenges = Profile.findChallenge('simplelogin:11', challengeId);
        console.log(uchallenges);
    };

  $scope.deleteChallenge = function (challenge) {
        Challenge.delete(challenge);
    };

  $scope.editChallenge = function (challenge) {
    $scope.m_challenge = Challenge.get(challenge.$id);
  },
    function (error) {
      $scope.error = error.toString();
    };

  $scope.updateChallenge = function (challenge) {
    $scope.error = "";
    $scope.success = "";
    return Challenge.update(challenge).then(function () {
      $scope.success = "Updated";
    });
  },
    function (error) {
      $scope.error = error.toString();
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
      addPoints($scope.user, challenge.points).then(function () {
        $scope.open('large', 'views/modals/addChallengeModal.html', challenge, $scope.user);
            });

        });

    };

    function addPoints(user, points) {
        var prePoints = parseInt(user.profile.points);
        var score = prePoints + parseInt(points);
        user.profile.points = score;
        return user.profile.$save();
    }

  $scope.open = function (size, templateUrl, challenge, user) {
        var modalInstance = $modal.open({
            templateUrl: templateUrl,
          size: size,
          controller: 'CongratsCtrl',
          resolve: {
            challenge: function () {
              return challenge;
            },
            user: function () {
              return user;
            }
          }

        })
    }

});


app.controller('CongratsCtrl', function ($scope, challenge, user) {
  $scope.challenge = challenge;
  $scope.user = user;
})
