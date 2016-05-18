describe('quizzesControllers', function() {
  var scope, controller, routeParams, Quizzes, Quiz, QuestionsHelper;

  scope = {};
  routeParams = {};
  Quizzes = {
    save:  function() {},
    query: function() {}
  };
  Quiz = {
    show:   function() {},
    update: function() {},
    delete: function() {}
  };
  QuestionsHelper = {
    countQuestions:      function() {},
    checkAbsence:        function() {},
    restrictAdding:      function() {},
    pushEmptyQuestionTo: function() {},
  };

  beforeEach(module('quizzesControllers'));

  describe('newQuizCtrl', function() {
    beforeEach(inject(function(_$controller_) {
      controller = _$controller_;
      controller('newQuizCtrl', {
        $scope: scope,
        Quizzes: Quizzes,
        Quiz: Quiz,
        QuestionsHelper: QuestionsHelper
      });
    }));

    it('should use helper to add new question', function() {
      expect(scope.addQuestion)
        .toEqual(QuestionsHelper.pushEmptyQuestionTo);
    });

    it('$scope.countQuestions should use helper', function() {
      expect(scope.countQuestions)
        .toEqual(QuestionsHelper.countQuestions);
    });

    it('$scope.checkAbsence should use helper', function() {
      expect(scope.checkAbsence)
        .toEqual(QuestionsHelper.checkAbsence);
    });

    it('$scope.restrictAdding should use helper', function() {
      expect(scope.restrictAdding)
        .toEqual(QuestionsHelper.restrictAdding);
    });

    it('should remove correct input of question from the form', function() {
      scope.removeQuestion(scope.quiz.questions_attributes);
      expect(scope.quiz.questions_attributes.length).toEqual(0);
    })

    it('should save new quiz', function() {
      spyOn(Quizzes, 'save');
      scope.createQuiz();
      expect(Quizzes.save).toHaveBeenCalled();
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
        Quiz: Quiz,
        QuestionsHelper: QuestionsHelper
      });
      scope.quiz = {questions_attributes:[{content: '', record_time_limit: ''}]};
    }));

    it('should use helper to add new question', function() {
      expect(scope.addQuestion)
        .toEqual(QuestionsHelper.pushEmptyQuestionTo);
    });

    it('$scope.countQuestions should use helper', function() {
      expect(scope.countQuestions)
        .toEqual(QuestionsHelper.countQuestions);
    });

    it('$scope.checkAbsence should use helper', function() {
      expect(scope.checkAbsence)
        .toEqual(QuestionsHelper.checkAbsence);
    });

    it('$scope.restrictAdding should use helper', function() {
      expect(scope.restrictAdding)
        .toEqual(QuestionsHelper.restrictAdding);
    });

    it('should set quiz.question._destroy option to the true when removing question', function() {
      scope.quiz.question = {};
      scope.removeQuestion(scope.quiz.question);
      expect(scope.quiz.question._destroy).toEqual(true);
    });

    it('should update quiz', function() {
      spyOn(Quiz, 'update');
      scope.editQuiz();
      expect(Quiz.update).toHaveBeenCalled();
    });
  });

  describe('showQuizCtrl', function() {
    beforeEach(inject(function(_$controller_) {
      controller = _$controller_;
      controller('showQuizCtrl', {
        $scope: scope,
        $routeParams: routeParams,
        Quiz: Quiz,
        QuestionsHelper: QuestionsHelper
      });
      scope.quiz = {questions_attributes:[{content: '', record_time_limit: ''}]};
    }));

    it('$scope.checkAbsence should use helper', function() {
      expect(scope.checkAbsence)
        .toEqual(QuestionsHelper.checkAbsence);
    });
  });
});
