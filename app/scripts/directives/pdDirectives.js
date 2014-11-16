/**
 * Created by billh_000 on 10/28/2014.
 */
'use strict';

/*pdlab shrink and grow */
app.directive("enter", function () {

  return {
    link: function (scope, element, attrs) {
      element.bind("mouseenter", function () {
        element.removeClass(attrs.enter);
      });
    }
    }
});
app.directive("leave", function () {
  return {
    link: function (scope, element, attrs) {
      element.bind("mouseleave", function () {
        element.addClass(attrs.enter);
      });
    }
    }
});


app.directive("floatingLabel", function () {
  return {
    link: function (scope, element, attrs) {
      element.bind("input propertychange", function () {
        element.addClass("floating-label-form-group-with-value");

      });

    }
    }
});


app.directive('alerter', function ($timeout, alert) {
  return {
    templateUrl: 'app/directives/alerter/alerter.html',
    restrict: 'E',
    scope: {},
    link: function ($scope) {
      $scope.alerts = alert.alerts;

      $scope.closeAlert = function (index, actualElement) {
        alert.remove(index, actualElement);
      };

      $scope.$watchCollection('alerts', function (newAlerts) {
        $timeout(function () {
            $scope.closeAlert(newAlerts.length - 1, newAlerts[newAlerts.length - 1]);
          },
          10000);
      });
    }
  };
});
