/**
 * Created by bhenn_000 on 10/19/2014.
 */
'use strict';

app.factory('Profile', function ($window, FIREBASE_URL, $firebase, Post, Challenge, $q) {
    var ref = new $window.Firebase(FIREBASE_URL);


    var profile = {
        all: $firebase(ref.child('profile')).$asArray(),

        get: function (userId) {
            //console.log(userId);
            return $firebase(ref.child('profile').child(userId)).$asObject();
        },
      findByUsername: function (username) {
        if (username) {

          var queryRef = ref.child('profile').startAt(username).endAt(username);

          return $firebase(queryRef).$asObject();
        }
        ;
      },

      setPriority: function (username) {
        var user = new Firebase(FIREBASE_URL + 'profile/' + username);
        user.setPriority(username);
      },
        getPosts: function (userId) {
            var defer = $q.defer();

            $firebase(ref.child('user_posts').child(userId))
                .$asArray()
                .$loaded()
                .then(function (data) {
                    var posts = {};

                    for (var i = 0; i < data.length; i++) {
                        var value = data[i].$value;
                        posts[value] = Post.get(value);
                    }
                    defer.resolve(posts);
                });

            return defer.promise;
        },

        getChallenges: function (userId) {
            var defer = $q.defer();

            $firebase(ref.child('user_challenges').child(userId))
                .$asArray()
                .$loaded()
                .then(function (data) {
                    var challenges = {};

                    for (var i = 0; i < data.length; i++) {
                        var value = data[i].$value;
                        challenges[value] = Challenge.get(value);
                    }
                    defer.resolve(challenges);
                });

            return defer.promise;
        },

        challenges: function (userId) {
            //return $firebase(new Firebase(FIREBASE_URL + 'user_challenges/' + userId));
            return $firebase(ref.child('user_challenges').child(userId)).$asObject();
        },

        values: function (userId) {
            console.log(userId);
            return $firebase(ref.child('user_values').child('uid').$valueAt(userId).$asObject());
        },

        findChallenge: function (userId, challengeId) {
            return $firebase(ref.child('user_challenges').child(userId))
                .startAt(challengeId)
                .endAt(challengeId)
                .once('value', function (snap) {
                    return snap.val();
                });
        },


        update: function (user) {

            return user.$save();
        }



    };

    return profile;
});
