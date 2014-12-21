describe('pic load testing', function() {

	beforeEach(module('picload'));

	var scope, controller, ctrl, http, back, flow;

	beforeEach(inject(function($injector) {

		back = $injector.get('$httpBackend');

		scope = $injector.get('$rootScope');
		scope = scope.$new();

		http = $injector.get('$http');

		controller = $injector.get('$controller');

		ctrl = controller('photosCtrl', { $scope: scope, $http: http });

	}));

	afterEach(function() {
		back.verifyNoOutstandingExpectation();
		back.verifyNoOutstandingRequest();
	});

	it('Should have photos populated', function() {
		back.expectGET('/photos/list/').respond([]);
		expect(scope.photos).toBeDefined();
		back.flush();
	});
})