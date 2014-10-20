/**
 * Created by billh_000 on 10/10/2014.
 */
'use strict';

app.controller('FeatureCtrl', function ($scope, $location, Feature, Auth) {
    $scope.feature = {title: '', description: '', reporter: '', priority: 2, status: 'New'};
    $scope.features = Feature.all;
    $scope.user = Auth.user;

    $scope.submitFeature = function () {
        $scope.feature.reporter = $scope.user.profile.username;
        Feature.create($scope.feature).then(function (featureId) {
            $scope.feature = {title: '', description: '', reporter: '', priority: 2, status: 'New'};
            $scope.success = "Thank you. May I have another?";
            //TODO: create a showfeature page to manage individual features
            //$location.path('/features/' + featureId);
        }, function (error) {
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

});