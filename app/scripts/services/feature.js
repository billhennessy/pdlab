/**
 * Created by billh_000 on 10/10/2014.
 */

app.factory('Feature',
    function ($firebase, FIREBASE_URL) {
        var ref = new Firebase(FIREBASE_URL);
        var features = $firebase(ref.child('features')).$asArray();

        var Feature = {
            all: features,
            create: function (feature) {
                return features.$add(feature).then(function (featureRef) {
                    $firebase(ref.child('user_features').child(feature.creatorUID))
                        .$push(featureRef.name());
                    return featureRef;
                });
            },
            get: function (featureId) {
                return $firebase(ref.child('features').child(featureId)).$asObject();
            },
            delete: function (feature) {
                return features.$remove(feature);
            },

            update: function (feature) {
                return features.$save(feature);
            },

            comments: function (featureId) {
                return $firebase(ref.child('comments').child(featureId)).$asArray();
            }
        };

        return Feature;
    });


/*'use strict';

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
 );*/