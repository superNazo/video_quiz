var videoQuizRoutes = angular.module("videoQuizRoutes", []);

videoQuizRoutes.config(["$routeProvider",
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'angularjs_app/components/quizzes/views/indexQuiz.html',
      controller: 'indexQuizCtrl'
    }).
    when('/new_quiz', {
      templateUrl: 'angularjs_app/components/quizzes/views/newQuiz.html',
      controller: 'newQuizCtrl'
    }).
    when('/:quizId/edit_quiz', {
      templateUrl: 'angularjs_app/components/quizzes/views/editQuiz.html',
      controller: 'editQuizCtrl'
    }).
    otherwise({
      redirectTo: '/'
    })
    .when('/:quizId/show_quiz', {
      templateUrl: 'angularjs_app/components/quizzes/views/showQuiz.html',
      controller: 'showQuizCtrl'
    })
  }
]);

videoQuiz.config(["$httpProvider", function($httpProvider) {
  $httpProvider.defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content");
}]);
