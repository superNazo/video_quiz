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
  }
]);

quizzesControllers.controller('indexQuizCtrl',
  ['$scope', '$location', 'Quizzes', 'Quiz',
  function($scope, $location, Quizzes, Quiz ) {

    $scope.quizzes = Quizzes.query();

    $scope.sort = function(keyname) {
      $scope.sortKey = keyname;
      $scope.reverse = !$scope.reverse;
    };

    $scope.confirm = function(msg) {
      return confirm(msg);
    };

    $scope.deleteQuiz = function (quizId) {
      if ($scope.confirm('Are you sure you want to delete this quiz?')){
        Quiz.delete({id: quizId}, function(){
          $scope.quizzes = Quizzes.query();
          $location.path('/');
        });
      }
    };
  }
]);

quizzesControllers.controller('editQuizCtrl',
  ['$scope', '$routeParams', '$location', 'Quiz',
  function($scope, $routeParams, $location, Quiz) {
    $scope.quiz = Quiz.show({id: $routeParams.quiz_id});

    $scope.add = function(){
      $scope.quiz.questions.push({
        content: ''
      });
    };

    $scope.editQuiz = function() {
      Quiz.update({
        id: $routeParams.quiz_id,
        quiz: {
          name: $scope.quiz.name,
          questions_attributes: $scope.quiz.questions
        }
      }, function() {
        $location.path('/quizzes');
      });
    };
  }]
);

quizzesControllers.controller('startQuizCtrl', ['$scope', '$routeParams', 'Quiz',
  function($scope, $routeParams, Quiz) {
    $scope.quiz = Quiz.get({id: $routeParams.quiz_id});
  }
]);