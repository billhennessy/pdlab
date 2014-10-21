'use strict';

describe('Controller: LabCtrl', function () {

    // load the controller's module
    beforeEach(module('angNewsApp'));

    var LabCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        LabCtrl = $controller('LabCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of Labs to the scope', function () {
        expect(scope.labs.length).toBe('5');
    });
});