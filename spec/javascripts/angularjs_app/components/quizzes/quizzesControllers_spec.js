describe('quizzesControllers', function() {
  var scope, controller, routeParams, Quizzes, Quiz;

  scope = {};
  routeParams = {};
  Quizzes = {
    query: function() {}
  };
  Quiz = {
    show: function() {},
    update: function() {},
    delete: function() {}
  };

  beforeEach(module('quizzesControllers'));

  describe('newQuizCtrl', function() {
    beforeEach(inject(function(_$controller_) {
      controller = _$controller_;
      controller('newQuizCtrl', {
        $scope: scope,
        Quizzes: Quizzes
      });
    }));

    it('should add new input to the form when pressing addQuestion button', function() {
      scope.addQuestion();
      expect(scope.quiz.questions_attributes.length).toEqual(2);
    });

    it('should remove correct input of question from the form', function() {
      for (var i = 0; i < 2; i++) {
        scope.addQuestion();
      };

      scope.removeQuestion(scope.quiz.questions_attributes);
      expect(scope.quiz.questions_attributes.length).toEqual(2);
    });
  });

  describe('indexQuizCtrl', function() {
    beforeEach(inject(function(_$controller_) {
      controller = _$controller_;
      controller('indexQuizCtrl', {
        $scope: scope,
        Quizzes: Quizzes,
        Quiz: Quiz
      });
    }));

    it('should delete quiz from quizzes list', function() {
      spyOn(Quiz, 'delete');
      scope.confirm = function(msg) { return true; };

      scope.deleteQuiz();

      expect(Quiz.delete).toHaveBeenCalled();
    });

    it('should cancel delete quiz from quizzes list', function() {
      spyOn(Quiz, 'delete');
      scope.confirm = function(msg) { return false; };

      scope.deleteQuiz();

      expect(Quiz.delete).not.toHaveBeenCalled();
    });
  });

  describe('editQuizCtrl', function() {
    beforeEach(inject(function(_$controller_) {
      controller = _$controller_;
      controller('editQuizCtrl', {
        $scope: scope,
        $routeParams: routeParams,
        Quiz: Quiz
      });
      scope.quiz = {};
    }));

    it('should update new input to the form', function() {
      spyOn(Quiz, 'update');

      scope.editQuiz();

      expect(Quiz.update).toHaveBeenCalled();
    });

    it('should set quiz.question._destroy option to the true when removing question', function() {
      scope.quiz.question = {};
      scope.removeQuestion(scope.quiz.question);
      expect(scope.quiz.question._destroy).toEqual(true);
    });
  }); 
});
