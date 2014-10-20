'use strict';

/**
 * @ngdoc function
 * @name angNewsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angNewsApp
 */
angular.module('angNewsApp')
    .controller('AboutCtrl', function ($scope, $modal, $modalinstance, Lab) {
        $scope.labs = Lab.all;

        console.log('labs:' + $scope.labs);
    });
