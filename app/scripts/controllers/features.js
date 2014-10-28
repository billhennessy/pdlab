/**
 * Created by billh_000 on 10/10/2014.
 */
'use strict';

app.controller('FeaturesCtrl', function ($scope, $location, Feature, Auth) {
    $scope.features = Feature.all;
    $scope.user = Auth.user;

    $scope.feature = {title: '', description: ''};

    $scope.submitFeature = function () {
        $scope.error = '';
        $scope.success = '';
        $scope.feature.creator = $scope.user.profile.username;
        $scope.feature.creatorUID = $scope.user.uid;
        $scope.feature.priority = 2;
        $scope.feature.status = 'New';
        Feature.create($scope.feature).then(function (ref) {
            $scope.success = 'Thank you, may we have another?';
            // $location.path('/features/' + ref.name());
            $scope.feature = {title: '', description: ''};
        }, function (error) {
            $scope.error = error.toString();
            $log(error);
        });
    };

    $scope.updateFeature = function (feature) {
        return Feature.update(feature);
    }, function (error) {
        $scope.error = error.toString();
        $log(error);
    };

    $scope.deleteFeature = function (feature) {
        return Feature.delete(feature);
    }, function (error) {
        $scope.error = error.toString();
        $log(error);
    };

});


/*'use strict';

 app.controller('FeatureCtrl', function ($scope, $location, Feature, Auth) {
 $scope.feature = {title: '', description: '', reporter: '', priority: 2, status: 'New'};
 $scope.features = Feature.all;
 $scope.user = Auth.user;

 $scope.submitFeature = function () {
 $scope.error = "";
 $scope.feature.reporter = $scope.user.profile.username;
 Feature.create($scope.feature).then(function (featureId) {
 $scope.feature = {title: '', description: '', reporter: '', priority: 2, status: 'New'};
 $scope.success = "Thank you. May I have another?";
 //TODO: create a showfeature page to manage individual features
 //$location.path('/features/' + featureId);
 }, function (error) {
 $scope.success="";
 $scope.error = error.toString();
 });
 };

 $scope.statusCount = function (status) {
 var stat = 0;

 angular.forEach($scope.features, function (feature) {
 if (feature.status === status) {
 stat += 1;
 }
 ;
 });
 return stat;
 };

 $scope.selectFeature = function (featureId) {

 $scope.feature = Feature.find(featureId);
 };
 $scope.deleteFeature = function (feature) {

 $scope.feature = Feature.delete(feature);
 };

 $scope.updateFeature = function (feature) {
 $scope.feature = Feature.update(feature);
 };

 $scope.showModal = false;

 $scope.status = 'New';

 $scope.chkStatus = function (feature, status) {
 return feature === status;
 }

 });*/