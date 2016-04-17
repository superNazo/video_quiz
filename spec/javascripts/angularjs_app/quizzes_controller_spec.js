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

describe("newQuizCtrl", function() {
  beforeEach(module("quizzesControllers"));
  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe("$scope.add", function() {
    it("Add new input to the form", function() {
      var $scope = {};
      $controller("newQuizCtrl", {$scope: $scope});

      $scope.add();

      expect($scope.quiz.questions_attributes.length).toEqual(2);
    });
  });
});

describe("indexQuizCtrl", function(){
  beforeEach(module("videoQuiz"));
  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

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

      var reverseState = true;

      $scope.sort();

      expect($scope.reverse).toEqual(reverseState);
    });
  });
});

describe('editQuizCtrl', function() {
  var $controller, $scope, $routeParams, Quiz;

  $scope = {};
  $routeParams = {};
  Quiz = {
    show: function() {},
    update: function() {}
  };

  beforeEach(module('quizzesControllers'));
  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;

    $controller('editQuizCtrl', {
      $scope: $scope,
      $routeParams: $routeParams,
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
describe("Testing Routes", function(){
  var $route, $rootScope, $location, $httpBackend;

  beforeEach(function(){
    module("videoQuiz");

    inject(function($injector){
      $route = $injector.get("$route");
      $rootScope = $injector.get("$rootScope");
      $location = $injector.get("$location");
      $httpBackend = $injector.get("$httpBackend");

      $httpBackend.when
        ("GET", "angularjs_app/components/quizzes/views/indexQuiz.html").respond("/");
      $httpBackend.when
        ("GET", "angularjs_app/components/quizzes/views/showQuiz.html").respond("/:quizId/show_quiz");
      $httpBackend.when
        ("GET", "angularjs_app/components/quizzes/views/newQuiz.html").respond("/new_quiz");
    });
  });

  it("should navigate to all quizzes list", function() {
    $rootScope.$apply(function() {
      $location.path("/");
    });
    expect($location.path()).toBe("/");
    expect($route.current.templateUrl).toBe
      ("angularjs_app/components/quizzes/views/indexQuiz.html");
    expect($route.current.controller).toBe("indexQuizCtrl");
  });

  it("should navigate to selected quiz", function(){
    $rootScope.$apply(function() {
      $location.path("/:quizId/show_quiz");
    });
    expect($location.path()).toBe("/:quizId/show_quiz");
    expect($route.current.templateUrl).toBe
      ("angularjs_app/components/quizzes/views/showQuiz.html");
    expect($route.current.controller).toBe("showQuizCtrl");
  });

  it("should navigate to new quiz", function(){
    $rootScope.$apply(function() {
      $location.path("/new_quiz");
    });
    expect($location.path()).toBe("/new_quiz");
    expect($route.current.templateUrl).toBe
      ("angularjs_app/components/quizzes/views/newQuiz.html");
    expect($route.current.controller).toBe("newQuizCtrl");
  });

  it("should redirect not registered urls to index", function(){
    $rootScope.$apply(function() {
      $location.path("/other");
    });
    expect($location.path()).toBe("/");
    expect($route.current.templateUrl).toBe
      ("angularjs_app/components/quizzes/views/indexQuiz.html");
    expect($route.current.controller).toBe("indexQuizCtrl");
  });
});

describe('editQuizCtrl', function() {
  var $controller, $scope, $routeParams, Quiz;

  $scope = {};
  $routeParams = {};
  Quiz = {
    show: function() {},
    update: function() {}
  };

  beforeEach(module('quizzesControllers'));
  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;

    $controller('editQuizCtrl', {
      $scope: $scope,
      $routeParams: $routeParams,
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
