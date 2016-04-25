var videoQuiz = angular.module('videoQuiz', [
  'templates',
  'ngRoute',
  'ngResource',
  'videoQuizRoutes',
  'quizzesControllers',
  'videoQuizServices',
  'ng-will-paginate',
  'angularUtils.directives.dirPagination'
]);

$(document).on('ready page:load', function(arguments) {
  angular.bootstrap(document.body, ['videoQuiz'])
});
