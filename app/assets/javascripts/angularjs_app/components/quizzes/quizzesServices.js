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

videoQuizServices.factory('Interview', ['$resource',
  function($resource){
    return $resource('quizzes/:quizId/interviews/create.json', {}, {
      create: {method: 'POST', params: {quizId: '@quizId'}}      
    });
  }
]);

videoQuizServices.factory('Answer', ['$resource',
  function($resource){
    return $resource('quizzes/:quizId/answers.json', {}, {
      create: {method: 'POST', params: {quizId: '@quizId'}}      
    });
  }
]);

