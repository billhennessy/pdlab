/**
 * Created by billh_000 on 10/02/2014.
 */
'use strict';


app.factory('Lab',
  function ($firebase, FIREBASE_URL, $q, Profile) {
    var ref = new Firebase(FIREBASE_URL);
    var labs = $firebase(ref.child('labs')).$asArray();

    var Lab = {
      all: labs,
      create: function (lab) {
        return labs.$add(lab)
      },
      get: function (labId) {
        return $firebase(ref.child('labs').child(labId)).$asObject();
      },

      update: function (lab) {
        return lab.$save();
      },

      delete: function (lab) {
        return lab.$remove();
      },
      comments: function (labId) {
        return $firebase(ref.child('comments').child(labId)).$asArray();
      },

      users: function (labId) {
        return $firebase(ref.child('lab_users').child(labId)).$asArray();
      },

      addUser: function (labId, uid) {
        return $firebase(ref.child('lab_users').child(labId)).$push(uid);

      },

      getUsers: function (labId) {
        var defer = $q.defer();

        $firebase(ref.child('lab_users').child(labId))
          .$asArray()
          .$loaded()
          .then(function (data) {
            var users = {};

            for (var i = 0; i < data.length; i++) {
              var value = data[i].$value;
              users[value] = Profile.get(value);
            }
            defer.resolve(users);
          });

        return defer.promise;
      }
    };

    return Lab;
  });


/*
 app.factory('Lab',
    function ($firebase, FIREBASE_URL) {
        var ref = new Firebase(FIREBASE_URL + 'labs');

        var labs = $firebase(ref).$asArray();

        var Lab = {
            all: labs,

            create: function (lab) {


                return labs.$add(lab).then(function (ref) {
                    var labId = ref.name();

                    return labId;
                });

            },

            find: function (labId) {
                return $firebase(ref.child(labId)).$asObject();
            },

            findByClient: function (client) {
                return $firebase(ref.child(client)).$asObject();
            },

            delete: function (lab) {

                labs.$remove(lab).then(function () {

                });

            },
            update: function (lab) {
                return labs.$save(lab);
            },

            users: function (labId) {
                return $firebase(new Firebase(FIREBASE_URL + 'lab_users/' + labId));
            }

        }

        return Lab;
    }
 );*/
