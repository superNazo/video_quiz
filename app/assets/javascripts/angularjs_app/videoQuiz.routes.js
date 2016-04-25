var videoQuizRoutes = angular.module('videoQuizRoutes', []);

videoQuizRoutes.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'angularjs_app/components/quizzes/views/indexQuiz.html',
      controller: 'indexQuizCtrl'
    }).
    when('/quizzes', {
      templateUrl: 'angularjs_app/components/quizzes/views/indexQuiz.html',
      controller: 'paginationCtrl'
    }).
    when('/new', {
      templateUrl: 'angularjs_app/components/quizzes/views/newQuiz.html',
      controller: 'newQuizCtrl'
    }).
    when('/:quiz_id/edit', {
      templateUrl: 'angularjs_app/components/quizzes/views/editQuiz.html',
      controller: 'editQuizCtrl'
    }).
    when('/:quiz_id/start', {
      templateUrl: 'angularjs_app/components/quizzes/views/startQuiz.html',
      controller: 'startQuizCtrl'
    }).
    when('/:quiz_id/finish', {
      templateUrl: 'angularjs_app/components/quizzes/views/finishQuiz.html'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
]);

videoQuiz.config(["$httpProvider", function($httpProvider) {
  $httpProvider.defaults.headers
          .common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);
