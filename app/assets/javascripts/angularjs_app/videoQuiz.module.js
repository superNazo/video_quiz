var videoQuiz = angular.module('videoQuiz', [
  'templates',
  'ngRoute',
  'ngResource',
  'videoQuizRoutes',
  'homeControllers',
  'quizzesControllers',
  'videoQuizServices',
  'ngAnimate',
  'ui.bootstrap'
]);

videoQuiz.config(["$httpProvider", function($httpProvider) {
  $httpProvider.defaults.headers
          .common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);

$(document).on('ready page:load', function(arguments) {
  angular.bootstrap(document.body, ['videoQuiz'])
});
