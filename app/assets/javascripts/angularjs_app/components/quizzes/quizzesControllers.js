var quizzesControllers = angular.module('quizzesControllers', []);
quizzesControllers.controller('newQuizCtrl', ['$scope', '$http', '$window',
  function($scope, $http, $window){
    $scope.quiz = {};
    $scope.quiz.questions_attributes = [{content: ''}];

    $scope.add = function(){
    $scope.quiz.questions_attributes.push({
      content: ''
    });
    };
  $scope.createQuiz = function(){
    // We need to test that $http object calls `post`
    // function and passes specific arguments?
    $http.post('/quizzes', {'quiz': $scope.quiz}).then(function(){
      $window.location.href = '/quizzes';
    });
  };
  }]);

quizzesControllers.controller('indexQuizCtrl', ['$scope', 'Quizzes',  function($scope, Quizzes) {

    $scope.quizzes = Quizzes.query();

    $scope.sort = function(keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }
}]);
