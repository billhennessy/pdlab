/**
 * Created by billh_000 on 10/10/2014.
 */

app.directive('akModal', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.$watch(attrs.akModal, function(value) {
                if (value) element.modal('show');
                else element.modal('hide');
            });
        }
    };
});
