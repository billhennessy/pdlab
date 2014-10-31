/**
 * Created by billh_000 on 9/19/2014.
 */
'use strict';

app.directive('checkUsername', function (Profile) {
    var usernameRegexp = /^[^.$\[\]#\/\s]+$/;

    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.push(function (viewValue) {
                if (usernameRegexp.test(viewValue)) {
                  Profile.findByUsername(viewValue).$loaded(function (user) {

                        if (user.$value === null) {
                            ctrl.$setValidity('taken', true);
                            ctrl.$setValidity('invalid', true);
                        } else {
                          console.log('false');
                            ctrl.$setValidity('taken', false);
                            ctrl.$setValidity('invalid', true);
                        }

                  });

                    return viewValue;
                } else {
                    ctrl.$setValidity('taken', true);
                    ctrl.$setValidity('invalid', false);

                    return viewValue;
                }
            });
        }
    };
});
