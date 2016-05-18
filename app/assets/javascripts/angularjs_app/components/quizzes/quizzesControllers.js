var quizzesControllers = angular.module('quizzesControllers', []);

var pushEmptyQuestionTo = function(questionsAttributes) {
  return questionsAttributes.push({
    content: '', record_time_limit: ''
  });
};

quizzesControllers.controller('newQuizCtrl', ['$scope', '$http', '$location', 'Quizzes',
  function($scope, $http, $location, Quizzes){
    $scope.quiz = {questions_attributes:[{content: '', record_time_limit: ''}]};

    $scope.addQuestion = function(){
      pushEmptyQuestionTo($scope.quiz.questions_attributes);
    };

    $scope.removeQuestion = function(question) {
      var questionIndex = $scope.quiz.questions_attributes.indexOf(question);
      $scope.quiz.questions_attributes.splice(questionIndex, 1);
    };

    $scope.createQuiz = function(){
      Quizzes.save({quiz: $scope.quiz});
      $location.path('/quizzes');
    };
  }
]);

quizzesControllers.controller('indexQuizCtrl',
  ['$scope', '$location', 'Quizzes', 'Quiz',
  function($scope, $location, Quizzes, Quiz) {
    $scope.currentPage = 1;

    $scope.setPage = function() {
      Quizzes.query({page: $scope.currentPage}, function(data) {
        $scope.quizzes = data.collection;
        $scope.totalQuizzes = data.total_items;
      });
    };

    $scope.setPage();

    $scope.confirm = function(msg) {
      return confirm(msg);
    };

    $scope.deleteQuiz = function (quizId) {
      if ($scope.confirm('Are you sure you want to delete this quiz?')){
        Quiz.delete({quizId: quizId}, function(){
          $scope.quizzes = Quizzes.query();
          $location.path('/quizzes');
        });
      }
    };
  }
]);

quizzesControllers.controller('editQuizCtrl',
  ['$scope', '$routeParams', '$location', 'Quiz',
  function($scope, $routeParams, $location, Quiz) {
    $scope.quiz = Quiz.show({quizId: $routeParams.quizId});

    $scope.addQuestion = function(){
      pushEmptyQuestionTo($scope.quiz.questions_attributes);
    };

    $scope.removeQuestion = function(question) {
      question._destroy = true;
    };

    $scope.editQuiz = function() {
      Quiz.update({
        quizId: $routeParams.quizId,
        quiz: $scope.quiz
      }, function() {
        $location.path('/quizzes');
      });
    };
  }]
);

quizzesControllers.controller('startQuizCtrl', ['$scope', '$routeParams', 'Quiz',
  function($scope, $routeParams, Quiz) {
    $scope.quiz = Quiz.get({quizId: $routeParams.quizId});
  }
]);

quizzesControllers.controller('showQuizCtrl', ['$scope', 'Quiz', '$routeParams',
  function($scope, Quiz, $routeParams) {
    $scope.quiz = Quiz.show({quizId: $routeParams.quizId});
  }
]);
