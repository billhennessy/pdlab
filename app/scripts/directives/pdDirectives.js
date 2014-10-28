/**
 * Created by billh_000 on 10/28/2014.
 */
'use strict';

<!-- navbar shrink and grow -->
app.directive("enter", function () {
  return function (scope, element, attrs) {
    element.bind("mouseenter", function () {
      element.removeClass(attrs.enter);
    });
  };
});
app.directive("leave", function () {
  return function (scope, element, attrs) {
    element.bind("mouseleave", function () {
      element.addClass(attrs.enter);
    });
  };
});

app.directive ('pdlabFocus', function() {
  return function
    (scope, element, attrs, controller) {
      element[0].focus();
  };
});
