describe("Toggle Link", function() {

  it("prevents adding question when 10th question added", function(){
    var newQuestionField = {
      hide: function(){},
      show: function(){}
    };

    var fieldsCount = function() {
      return {
        length: 10
      };
    };

    var questions = null;

    var object = new QuestionField(questions, fieldsCount, newQuestionField);
    spyOn(newQuestionField, "hide");

    object.toggleLink();
    expect(newQuestionField.hide).toHaveBeenCalled();
  });
});

describe("Bind Cocoon events to link", function(){
  it("adds one question when insert event fires", function(){
    var addQuestionLink = $("<div></div>"),
      fieldsCount = null,
      questions = null;

    var object = new QuestionField(addQuestionLink, fieldsCount, questions);

    spyOn(object, "toggleLink");
    object.bindCocoonEvents();

    addQuestionLink.trigger("cocoon:after-insert");
    expect(object.toggleLink).toHaveBeenCalled();
  });

  it("deletes one question when remove event fires", function(){
    var addQuestionLink = $("<div></div>"),
      fieldsCount = null,
      questions = null;

    var object = new QuestionField(addQuestionLink, fieldsCount, questions);

    spyOn(object, "toggleLink");
    object.bindCocoonEvents();

    addQuestionLink.trigger("cocoon:after-remove");
    expect(object.toggleLink).toHaveBeenCalled();
  });
});

describe("Controllers tests", function() {
  beforeEach(module("videoQuiz"));
  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
      Quiz = {
      delete: function() {},
      };
  }));

  describe("indexQuizCtrl", function(){
      describe("$scope.sort", function(){
      it("should change the sorting key", function(){
        var $scope = {};
        $controller("indexQuizCtrl", {$scope: $scope});

        $scope.sort("name");

        expect($scope.sortKey).toEqual("name");
      });

      it("should change the order of sorting quizzes to reverse", function(){
        var $scope = {};
        $controller("indexQuizCtrl", {$scope: $scope});
        $scope.reverse = false;

        $scope.sort();

        expect($scope.reverse).toBe(true);
      });
    });

      describe('$scope.deleteQuiz', function() {
      it('delete quiz from quizzes list', function() {
        var $scope = {};
        $controller('indexQuizCtrl', {$scope: $scope, Quiz: Quiz});
      
        spyOn(Quiz, 'delete');
        $scope.confirm = function(msg) { return true; };

        $scope.deleteQuiz();
 
        expect(Quiz.delete).toHaveBeenCalled();
      });

      it('cancel delete quiz from quizzes list', function() {
        var $scope = {};
        $controller('indexQuizCtrl', {$scope: $scope, Quiz: Quiz});
      
        spyOn(Quiz, 'delete');  
        $scope.confirm = function(msg) { return false; };

        $scope.deleteQuiz();

        expect(Quiz.delete).not.toHaveBeenCalled();
      });
    });
  });

  describe("newQuizCtrl", function() {
    describe("$scope.add", function() {
      it("Add new input to the form", function() {
        var $scope = {};
        $controller("newQuizCtrl", {$scope: $scope});

        $scope.add();

        expect($scope.quiz.questions_attributes.length).toEqual(2);
      });
    });
  });
});

describe('editQuizCtrl', function() {
  var $controller, $scope, Quiz;

  $scope = {};
  Quiz = {
    show: function() {},
    update: function() {}
  };

  beforeEach(module('quizzesControllers'));
  beforeEach(inject(function(_$controller_){
    _$controller_('editQuizCtrl', {
      $scope: $scope,
      $routeParams: {},
      Quiz: Quiz
    });

    $scope.quiz = {};
  }));

  describe('$scope.editQuiz', function() {
    it('Update new input to the form', function() {
      spyOn(Quiz, 'update');

      $scope.editQuiz();

      expect(Quiz.update).toHaveBeenCalled();
    });
  });
});
