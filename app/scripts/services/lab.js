/**
 * Created by billh_000 on 10/02/2014.
 */
'use strict';

app.factory('Lab',
    function ($firebase, FIREBASE_URL, User) {
        var ref = new Firebase(FIREBASE_URL + 'labs');

        var labs = $firebase(ref).$asArray();

        var Lab = {
            all: labs,
          
            create: function (lab) {

               if (User.signedIn()) {
                    var user = User.getCurrent();

                    lab.owner = user.username;

                    return labs.$add(lab).then(function (ref) {
                        var labId = ref.name();
                        User.labs(user.username).$set(labId, '');
                        return labId;
                    });
                }
            },

            find: function (labId) {
                return $firebase(ref.child(labId)).$asObject();
            },
            delete: function (lab) {
                if (User.signedIn()){
                    var user = User.getCurrent();
                    if (user.username === lab.owner) {
                        labs.$remove(lab).then(function () {

                            User.labs(user.username).$remove(lab.$id);
                        });
                    }
                }
            },
            update: function(lab) {
               return labs.$save(lab);
            }
}

            return Lab;
    }
);