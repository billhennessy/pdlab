'use strict';

describe('Controller: AuthCtrl', function () {

    // load the controller's module
    beforeEach(module('pdlab', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'firebase',
        'ui.bootstrap'
    ]));

    var AuthCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        AuthCtrl = $controller('AuthCtrl', {
            $scope: scope
        });
    }));

    it('should have a user', function () {
        expect(scope.user.username).toBe('');
    });
});
