/**
 * Created by billh_000 on 9/19/2014.
 */
'use strict';



app.controller('ProfileCtrl',
    function ($scope, $location, $routeParams, Challenge, Auth, User) {

       $scope.user = User.findByUsername($routeParams.username);

        $scope.updateUser = function (user) {
            return User.update(user);
        }

        $scope.challenges = {};
       // $scope.posts = {};
        $scope.commentedChallenges = {};
        $scope.comments = {};
        $scope.points = 0;

        $scope.user.$loaded(function() {
            populateChallenges();
           // populatePoints();
        });


        function populateChallenges () {
            var challenges = User.challenges($routeParams.username).$asArray();

            challenges.$loaded(function (){
                angular.forEach(challenges, function (challenge){
                    $scope.challenges[challenge.$id] = Challenge.find(challenge.$id);
                    $scope.points += challenge[1];
                });
            });

        };


        function populateComments () {
            var comments = User.comments($routeParams.username).$asArray();

            comments.$loaded(function () {
                angular.forEach(comments, function (comment) {

                    var challenge = Challenge.find(comment.challenge);

                    challenge.$loaded(function () {
                        var challengeComments = Challenge.comments(comment.comment).$asObject();

                        challengeComments.$loaded(function () {
                            $scope.commentedChallenges[comment.$id] = challenge;
                            $scope.comments[comment.$id] = challengeComments[comment.$id];
                        });
                    });
                });
            });
        }

        $scope.changePassword = function (email, oldpassword, newpassword, newpassword2) {

            if (newpassword === newpassword2) {
                Auth.changePassword(email, oldpassword, newpassword).then(function () {
                    $scope.error = "";
                    $scope.message = "Success! Please remember your new password.";
                }, function (error) {
                    $scope.error = error.toString();
                });
            } else {
                $scope.error = "Your new passwords do not match."
            }
        };

    });

