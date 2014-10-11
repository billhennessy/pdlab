/**
 * Created by billh_000 on 10/10/2014.
 */
'use strict';

app.controller('FeatureCtrl', function ($scope, $location, Feature, User) {
    $scope.feature = {title: '', description: '', reporter: '', priority: 2, status: 'New'};
    $scope.features = Feature.all;


    $scope.submitFeature = function () {
        Feature.create($scope.feature).then(function (featureId) {
            $scope.feature = {title: '', description: '', reporter: '', priority: 2, status: 'New'};
           // $location.path('/features/' + featureId);
           //TODO: create a showfeature page to manage individual features
            $location.path('/features/' + featureId);
        });
    };


    $scope.selectFeature = function(featureId){

        $scope.feature = Feature.find(featureId);
    };
    $scope.deleteFeature = function(feature){

        $scope.feature = Feature.delete(feature);
    };

    $scope.updateFeature = function(feature){
        $scope.feature = Feature.update(feature);
    };

    $scope.showModal = false;
});