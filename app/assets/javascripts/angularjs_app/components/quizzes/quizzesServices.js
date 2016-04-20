var videoQuizServices = angular.module('videoQuizServices', ['ngResource']);

videoQuizServices.factory('Quizzes', ['$resource',
  function($resource){
    return $resource('quizzes.json');
  }
]);

videoQuizServices.factory('Quiz', ['$resource',
  function($resource){
    return $resource('quizzes/:quizId.json', {}, {
      show: {method: 'GET', params: {quizId: '@quizId'}},
      update: {method:'PUT', params: {quizId: '@quizId'}}
    });
  }
]);
