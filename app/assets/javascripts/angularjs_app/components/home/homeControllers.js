var homeControllers = angular.module('homeControllers', []);

homeControllers.controller('popUpCtrl', ['$scope',
  function($scope) {
    $scope.authNetwork = function authNetwork() {
      var openUrl = 'users/auth/facebook';
      window.$windowScope = $scope;
      window.open(openUrl, "Authenticate Account", "width=500, height=500");
    };
  }
]);
