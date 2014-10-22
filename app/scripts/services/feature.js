/**
 * Created by billh_000 on 10/10/2014.
 */
'use strict';

app.factory('Feature',
    function ($firebase, FIREBASE_URL, Auth) {
        var ref = new Firebase(FIREBASE_URL + 'features');

        var features = $firebase(ref).$asArray();

        var Feature = {
            all: features,

            create: function (feature) {


                return features.$add(feature).then(function (ref) {
                    var featureId = ref.name();

                    return featureId;
                });

            },

            find: function (featureId) {
                return $firebase(ref.child(featureId)).$asObject();
            },
            delete: function (feature) {
                if (Auth.signedIn()) {

                    features.$remove(feature);
                }
            },
            update: function (feature) {
                return features.$save(feature);
            }
        }

        return Feature;
    }
);