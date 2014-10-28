'use strict';

app.controller('FeatureViewCtrl', function ($scope, $routeParams, Feature, Auth) {
    $scope.feature = Feature.get($routeParams.featureId);
    $scope.comments = Feature.comments($routeParams.featureId);

    
    $scope.user = Auth.user;
    $scope.signedIn = Auth.signedIn;

    $scope.addComment = function () {
        if(!$scope.commentText || $scope.commentText === '') {
            return;
        }

        var comment = {
            text: $scope.commentText,
            creator: $scope.user.profile.username,
            creatorUID: $scope.user.uid
        };
        $scope.comments.$add(comment);

        $scope.commentText = '';
    };

    $scope.deleteComment = function (comment) {
        $scope.comments.$remove(comment);
    };

});