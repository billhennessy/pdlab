/**
 * Created by billh_000 on 10/02/2014.
 */
'use strict';

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
);