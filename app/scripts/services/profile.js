/**
 * Created by bhenn_000 on 10/19/2014.
 */
'use strict';

app.factory('Profile', function ($window, FIREBASE_URL, $firebase, Post, Challenge, $q) {
    var ref = new $window.Firebase(FIREBASE_URL);


    var profile = {
        all: $firebase(ref.child('profile')).$asObject(),

        get: function (userId) {
            //console.log(userId);
            return $firebase(ref.child('profile').child(userId)).$asObject();
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
            return ref.child('user_challenges').child(userId).$asObject();
        },

        update: function (user) {
            user.$priority = user.$id;
            return user.$save();
        }



    };

    return profile;
});