'use strict';

describe('Controller: AuthCtrl', function () {

    // load the controller's module
    beforeEach(module('angNewsApp'));

    var AuthCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        AuthCtrl = $controller('AboutCtrl', {
            $scope: scope
        });
    }));

    it('should log in whennessy0725@gmail.com', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});