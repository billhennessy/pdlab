/**
 * Created by billh_000 on 9/19/2014.
 */
'use strict';


app.controller('ProgressCtrl',
    function ($scope, $location, Challenge, User) {
        $scope.user = function (username) {
            return User.findByUsername(username);
        };
//        if(User.signedIn()) {
//            $scope.user = User.getPoints();
//        }
//        console.log(User.signedIn());
//        console.log($scope.user);
//        $scope.challenges = {};
        // $scope.points = 0;
        /* $scope.user.$loaded(function() {

         populateChallenges();
         // populatePoints();
         });*/

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