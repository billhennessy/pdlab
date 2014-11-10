'use strict';

describe('Controller: LabsCtrl', function () {

    // load the controller's module
  beforeEach(module('pdlab'));

  var LabsCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
      LabsCtrl = $controller('LabsCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of Labs to the scope', function () {
      expect(scope.labs.length).toBe(6);
    });


});
