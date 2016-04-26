var videoQuizRoutes = angular.module('videoQuizRoutes', []);

videoQuizRoutes.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/quizzes', {
      templateUrl: 'angularjs_app/components/quizzes/views/indexQuiz.html',
      controller: 'indexQuizCtrl'
    }).
    when('/quizzes/new', {
      templateUrl: 'angularjs_app/components/quizzes/views/newQuiz.html',
      controller: 'newQuizCtrl'
    }).
    when('/quizzes/:quizId/edit', {
      templateUrl: 'angularjs_app/components/quizzes/views/editQuiz.html',
      controller: 'editQuizCtrl'
    }).
    when('/quizzes/:quizId/show', {
      templateUrl: 'angularjs_app/components/quizzes/views/showQuiz.html',
      controller: 'showQuizCtrl'
    }).
    when('/quizzes/:quizId/start', {
      templateUrl: 'angularjs_app/components/quizzes/views/startQuiz.html',
      controller: 'startQuizCtrl'
    }).
    when('/quizzes/:quizId/finish', {
      templateUrl: 'angularjs_app/components/quizzes/views/finishQuiz.html'
    }).
    otherwise({
      redirectTo: '/quizzes'
    });
    $locationProvider.html5Mode(true);
  }
]);
