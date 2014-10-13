/**
 * Created by billh_000 on 9/19/2014.
 */
'use strict';


app.controller('ProgressCtrl',
    function ($scope, $location, Challenge, User) {
        $scope.user = function (username) {
            return User.findByUsername(username);
        };

        $scope.isCollapsed = true;

        $scope.style = function (player, user) {
            if (player === user) {
                return 'text-warning';
            }
        }

        function populateChallenges() {
            var challenges = User.challenges('billhennessy').$asArray();
            var pts = 0;
            challenges.$loaded(function () {
                angular.forEach(challenges, function (challenge) {
                    // $scope.challenges[challenge.$id] = Challenge.find(challenge.$id);
                    //console.log(challenge.$value);
                    pts += parseInt(challenge.$value);
                });
                $scope.points = pts;
            });

        };


    });