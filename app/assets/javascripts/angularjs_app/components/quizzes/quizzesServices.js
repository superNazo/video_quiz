var videoQuizServices = angular.module('videoQuizServices', ['ngResource']);

videoQuizServices.factory('Quizzes', ['$resource',
  function($resource){
    return $resource('quizzes.json', {}, {
      query: {method: 'GET', isArray: false},
    });
  }
]);

videoQuizServices.factory('Quiz', ['$resource',
  function($resource){
    return $resource('quizzes/:quizId.json', {}, {
      show:   {method: 'GET', params: {quizId: '@quizId'}},
      update: {method: 'PUT', params: {quizId: '@quizId'}}
    });
  }
]);

videoQuizServices.factory('QuestionsHelper', [
  function() {
    return {
      limit : 10,
      countQuestions : function() {
        if (this.quiz.questions_attributes) {
          return this.quiz.questions_attributes.length;
        };
      },
      checkAbsence : function() {
        if (this.quiz.questions_attributes) {
          return this.quiz.questions_attributes.length < 1;
        };
      },
      restrictAdding : function() {
        if (this.quiz.questions_attributes) {
          return this.quiz.questions_attributes.length >= this.limit;
        };
     },
      pushEmptyQuestionTo : function() {
        return this.quiz.questions_attributes.push({
          content: '', record_time_limit: ''
        });
      }
    };
  }
])
