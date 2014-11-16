'use strict';

describe('Unit: AuthCtrl', function () {

    // load the controller's module
  beforeEach(module('pdlab'));

  var ctrl,
        scope;

    // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
    ctrl = $controller('AuthCtrl', {
            $scope: scope
        });
    }));


});
