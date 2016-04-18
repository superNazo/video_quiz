function Glue() {};

Glue.perform = function($scope, constructor) {
  // You code goes here
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
