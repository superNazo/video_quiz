var videoQuizServices = angular.module('videoQuizServices', ['ngResource']);

videoQuizServices.factory('Quizzes', ['$resource',
  function($resource) {
    return $resource('quizzes.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }
]);

videoQuizServices.factory('Quiz', ['$resource',
  function($resource){
    return $resource('quizzes/:id.json', {}, {
      show: {method: 'GET', params: {id: '@id'}},
      update: {method:'PUT', params: {id: '@id'}},
      delete: {method: 'DELETE', params: {id: '@id'}}
    });
  }
]);
