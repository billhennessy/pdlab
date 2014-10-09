/**
 * Created by billh_000 on 9/19/2014.
 */
'use strict';



app.controller('ProfileCtrl',
    function ($scope, $routeParams, Challenge, User) {

        $scope.user = User.findByUsername($routeParams.username);

        $scope.challenges = {};
       // $scope.posts = {};
        $scope.commentedChallenges = {};
        $scope.comments = {};

        $scope.user.$loaded(function() {
            populateChallenges();
            populateComments();
        });


        function populateChallenges () {
            var challenges = User.challenges($routeParams.username).$asArray();

            challenges.$loaded(function (){
                angular.forEach(challenges, function (challenge){
                    $scope.challenges[challenge.$id] = Challenge.find(challenge.$id);
                });
            });
        }

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
    });