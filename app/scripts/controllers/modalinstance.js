/**
 * Created by bhenn_000 on 10/13/2014.
 */
angular.module('angNewsApp')
    .controller('AboutCtrl', function ($scope, $modal) {


        $scope.open = function (size, templateUrl) {
            var modalInstance = $modal.open({
                templateUrl: templateUrl,
                size: size
            })
        }
    });
