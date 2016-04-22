var videoQuiz = angular.module('videoQuiz', [
  'templates',
  'ngRoute',
  'ngResource',
  'videoQuizRoutes',
  'quizzesControllers',
  'videoQuizServices'
]);

$(document).on('ready page:load', function(arguments) {
  angular.bootstrap(document.body, ['videoQuiz'])
});
