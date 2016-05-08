describe('videoQuizServices', function() {
  beforeEach(module('videoQuizServices'));

  describe('QuestionsHelper', function() {
    var QuestionsHelper;

    var scopeMock = {
      quiz: {
        questions_attributes: [{}]
      }
    };

    beforeEach(inject(function(_QuestionsHelper_) {
      QuestionsHelper = _QuestionsHelper_;
    }));

    describe('countQuestions()', function() {
      it('should count questions length', function() {
        scopeMock.quiz.questions_attributes.length = 5;
        var result = QuestionsHelper.countQuestions.apply(scopeMock);
        expect(result).toEqual(5);
      });
    });

    describe('checkAbsence()', function() {
      it('should return false if questions are present', function() {
        scopeMock.quiz.questions_attributes.length = 1;
        var result = QuestionsHelper.checkAbsence.apply(scopeMock);
        expect(result).toEqual(false);
      });

      it('should return true if questions are absent', function() {
        scopeMock.quiz.questions_attributes.length = 0;
        var result = QuestionsHelper.checkAbsence.apply(scopeMock);
        expect(result).toEqual(true);
      });
    });

    describe('restrictAdding()', function() {
      it('should return false when countQuestions<10', function() {
        scopeMock.limit = QuestionsHelper.limit;
        scopeMock.quiz.questions_attributes.length = 9;
        var result = QuestionsHelper.restrictAdding.apply(scopeMock);
        expect(result).toEqual(false);
      });

      it('should return true when countQuestions>=10', function() {
        scopeMock.quiz.questions_attributes.length = 10;
        var result = QuestionsHelper.restrictAdding.apply(scopeMock);
        expect(result).toEqual(true);
      });
    });

    describe('pushEmptyQuestionTo()', function() {
      it('should add empty question to array', function() {
        scopeMock.quiz.questions_attributes.length = 1;
        var result = QuestionsHelper.pushEmptyQuestionTo.apply(scopeMock);
        expect(scopeMock.quiz.questions_attributes.length).toEqual(2);
      });
    });
  });
});
