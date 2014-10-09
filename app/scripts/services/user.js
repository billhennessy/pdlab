/**
 * Created by billh_000 on 9/18/2014.
 */

'use strict';


app.factory('User',
    function ($firebase, FIREBASE_URL, Auth, $rootScope) {

        var ref = new Firebase(FIREBASE_URL + 'users');


        var users = $firebase(ref);


        var User = {

            all: users.$asArray(),

            create: function (authUser, username, fname, lname, cell) {

                var user = $firebase(ref.child(username)).$asObject();


                return user.$loaded(function () {

                    user.username = username;
                    user.fname = fname;
                    user.lname = lname;
                    user.cell = cell;
                    user.points = 0;

                    user.md5_hash = authUser.md5_hash;

                    user.$priority = authUser.uid;

                    user.$save();

                });

            },


            findByUsername: function (username) {

                if (username) {

                    return $firebase(ref.child(username)).$asObject();

                }

            },


            getCurrent: function () {

                return $rootScope.currentUser;

            },

            signedIn: function () {

                return $rootScope.currentUser !== undefined;

            },
            posts: function (username) {
                return $firebase(new Firebase(FIREBASE_URL + 'user_posts/' + username));
            },


            challenges: function (username) {
                return $firebase(new Firebase(FIREBASE_URL + 'user_challenges/' + username));
            },

            comments: function (username) {
                return $firebase(new Firebase(FIREBASE_URL + 'user_comments/' + username));
            },

            labs: function(username) {
                return $firebase(new Firebase(FIREBASE_URL + 'user_labs/' + username));
            }


        };

        function setCurrentUser (username) {

            $rootScope.currentUser = User.findByUsername(username);

        }


        $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {

            var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid)).$asArray();


            query.$loaded(function () {

                setCurrentUser(query[0].username);

            });

        });


        $rootScope.$on('$firebaseSimpleLogin:logout', function() {

            delete $rootScope.currentUser;

        });

        return User;

    });





