/**
 * Created by billh_000 on 10/6/2014.
 */
'use strict';

app.factory('Challenge',
    function ($firebase, FIREBASE_URL, User) {
        var ref = new Firebase(FIREBASE_URL + 'challenges');

        var challenges = $firebase(ref).$asArray();

        var Challenge = {
            all: challenges,
            create: function (challenge) {
                if (User.signedIn()) {
                    var user = User.getCurrent();

                    challenge.owner = user.username;

                    return challenges.$add(challenge).then(function (ref) {
                        var challengeId = ref.name();

                        // User.challenges(user.username).$set(challengeId, '');

                        return challengeId;
                    });
                }
            },

            find: function (challengeId) {
                return $firebase(ref.child(challengeId)).$asObject();
            },
            delete: function (challenge) {
                if (User.signedIn()) {
                    var user = User.getCurrent();
                    if (user.username === challenge.owner) {
                        challenges.$remove(challenge).then(function () {

                            //   User.challenges(user.username).$remove(challenge.$id);
                        });
                    }
                }
            },

            userChallenge: function (challengeId, points) {
                if (User.signedIn()) {
                    var user = User.getCurrent();
                    var challenge = Challenge.find(challengeId);
//TODO: test to see if user has already performed this challenge and skip point increment if so.
                    return  User.challenges(user.username).$set(challengeId, points).then(function () {
                        var score = parseInt(user.points) + parseInt(points);
                        user.points = score;
                        user.$save().then(function () {
                            ref.name() === user.$id;
                        });
                    });


                }
                ;
            },

            comments: function (challengeId) {
                return $firebase(new Firebase(FIREBASE_URL + 'comments/' + challengeId));
            },

            addComment: function (challengeId, comment) {
                if (User.signedIn()) {
                    var user = User.getCurrent();

                    comment.username = user.username;

                    Challenge.comments(challengeId).$push(comment).then(function (ref) {
                        var commentId = ref.name();
                        User.comments(user.username).$push({challenge: challengeId, comment: commentId});
                    });
                }
            },

            deleteComment: function (challengeId, comment) {
                if (User.signedIn()) {
                    var user = User.findByUsername(comment.username);
                    var commentId = comment.$id;

                    Challenge.comments(challenge).$remove(commentId).then(function () {
                        User.comments(user.username).$remove(commentId);
                    });
                }
            }
        };

        return Challenge;
    }
);