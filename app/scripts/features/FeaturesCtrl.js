/**
 * Created by billh_000 on 10/10/2014.
 */
'use strict';

app.controller('FeaturesCtrl', function ($scope, $location, Feature, Auth, features, $modal) {
  $scope.features = features;
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

  $scope.open = function (size) {


    var modalInstance = $modal.open({
      templateUrl: 'featureModal.html',
      controller: 'FeaturesModalCtrl',
      size: size,
      resolve: {
        feature: function () {
          return $scope.feature;
        }
      }
    })
  };


});


app.controller('FeaturesModalCtrl', function ($scope, $location, Feature, Auth) {

  $scope.user = Auth.user;

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
})
