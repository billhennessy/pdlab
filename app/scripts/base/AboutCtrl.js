'use strict';

/**
 * @ngdoc function
 * @name angNewsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angNewsApp
 */
app.controller('AboutCtrl', function ($scope, Lab) {
    $scope.labs = Lab.all;
  console.log($scope.labs.length)

});

