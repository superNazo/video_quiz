function Glue() {};

Glue.perform = function($scope, constructor) {
  for (var method in constructor.prototype) {
    if (constructor.prototype.hasOwnProperty(method)) {
      $scope[method] = constructor.prototype[method];
    }
  }

  $scope.initialize();
};




function PureObjectsCtrl($scope) {
  Glue.perform($scope, PureObjectsCtrl);
}

PureObjectsCtrl.prototype = {
  initialize: function() {
    this.objectsQuality = 'pure awesome';
    this.clickQuality = 'gently';
  },

  testButtonClick: function() {
    alert('You clicked me ' + this.clickQuality + '.');
  },
};





angular
.module('quizzesControllers', [])
.controller(PureObjectsCtrl);
